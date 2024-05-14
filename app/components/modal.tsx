"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  close: (state: boolean) => void;
  children: React.ReactNode;
};

export default function Modal({ open, close, children }: Props) {
  const modal = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      modal.current?.showModal();
    }
  }, [open]);

  return (
    <dialog
      ref={modal}
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => close(false)} className="cursor-default">
          close
        </button>
      </form>
    </dialog>
  );
}
