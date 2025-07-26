// components/Editor.js
import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { EDITOR_CONFIG } from "../utils/common/editor";
import { axiosWithAuth } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { useTaskData } from "../stores/taskStore";
import { useDrawer } from "../stores/preferenceStore";
import queryClient from "../utils/queryClient";
import Image from "@editorjs/image";

const Editor = () => {
  const editorRef = useRef();
  const [data, setData] = useState<OutputData | null>(null);
  const [readOnlyState, setReadOnlyState] = useState(true);
  const task = useTaskData();
  const drawer = useDrawer();

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosWithAuth.post("/task/content/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  // Menggunakan useMutation untuk meng-handle upload
  const { mutateAsync: uploadImageMutation } = useMutation(uploadImage, {
    onError: (error) => {
      console.error("Error uploading image:", error);
    },
    onSuccess: (data) => {
      console.log("Image uploaded successfully:", data);
    },
  });

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          ...EDITOR_CONFIG,
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile: async (file) => {
                  const { data } = await uploadImageMutation(file);
                  console.log(data);

                  return {
                    success: 1,
                    file: {
                      url: data.filepath,
                    },
                    // file: {
                    //   url: URL.createObjectURL(file),
                    //   raw: file,
                    // },
                  };
                },
              },
            },
          },
        },
        readOnly: readOnlyState,
        placeholder: "Let`s write an awesome description!",
        onChange: async (api, event) => {
          if (!editorRef?.current?.readOnly.isEnabled) {
            const data_ = await api.saver.save();
            setData(data_);
          }
        },
      });

      editorRef.current = editor;

      editor.isReady
        .then(() => {
          console.log("🎉Editor is ready");
        })
        .catch((e) => console.error("ERROR editor cleanup", e));
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current?.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (drawer == true) {
      if (editorRef.current) {
        editorRef.current?.isReady.then(() => {
          if (task?.description) {
            setTimeout(() => {
              editorRef.current?.render(JSON.parse(task?.description));
            }, 100);
          } else {
            setTimeout(() => {
              editorRef.current?.clear();
              editorRef.current?.readOnly.toggle(true);
              setReadOnlyState(true);
            }, 100);
          }
        });
      }
    } else {
      if (editorRef.current) {
        editorRef.current?.isReady.then(() => {
          editorRef.current.readOnly?.toggle(true);
          setReadOnlyState(true);
        });
      }
    }
  }, [drawer, task?.description]);

  const saveEditor = (payload) => {
    axiosWithAuth.patch(`/task/${task.taskId}`, payload).then(({ data }) => {
      toast.success(data.message);
    });
  };

  const { mutate: mutateSaveEditor, isLoading: loadingSaveEditor } =
    useMutation({
      mutationFn: saveEditor,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["taskKey"],
          refetchActive: true,
        });
      },
    });

  const handleSave = () => {
    let payload = {
      description: data,
    };
    mutateSaveEditor(payload);
  };

  const handleToggleReadOnly = (status: boolean) => {
    if (editorRef.current) {
      editorRef.current.readOnly.toggle(status); // Mengubah mode readOnly editor
      setReadOnlyState(status); // Perbarui state untuk merefleksikan perubahan
    }
  };

  return (
    <div className="w-full relative pt-14">
      <div className="absolute top-0 right-0 flex gap-3">
        {readOnlyState && (
          <button
            onClick={() => handleToggleReadOnly(false)}
            className="btn btn-sm btn-secondary px-8"
          >
            Edit
          </button>
        )}
        {!readOnlyState && (
          <>
            <button
              onClick={handleSave}
              className="btn btn-sm btn-primary px-8"
            >
              Save
            </button>
            <button
              onClick={() => handleToggleReadOnly(true)}
              className="btn btn-sm btn-warning px-8"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <div id="editorjs" className="editor-typography !max-w-full"></div>
    </div>
  );
};

export default Editor;
