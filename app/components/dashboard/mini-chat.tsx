import { useWebSocket } from '@/app/providers/WebSocketProvider';
import { fetchDataUserActive } from '@/app/services/chat.service';
import {
  Message,
  useMessages,
  useUser,
  useUserActions,
} from '@/app/stores/userStore';
import { axiosWithAuth } from '@/app/utils/axiosInstance';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useQuery } from 'react-query';

export default function MiniChat() {
  const { addMessage } = useUserActions();
  const user = useUser();
  const { sendMessage, socket, status } = useWebSocket();

  const [newMessage, setNewMessage] = useState('');
  const messages = useMessages();
  const { setMessages } = useUserActions();
  const [hasMore, setHasMore] = useState(true);
  const [team_id, setTeam_id] = useState(
    localStorage.getItem('instanceSelected')
  );
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const [rendered, setRendered] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const { data: userActive } = useQuery(
    ['userActive', team_id],
    ({ queryKey }) => fetchDataUserActive(queryKey[1])
  );

  useEffect(() => {
    if (socket) {
      socket.on(
        'message',
        (msg: {
          message: string;
          team_id: string;
          user_id: string;
          user: any;
          createdAt: string;
        }) => {
          let newMessage: Message = {
            id: new Date().toISOString(),
            message: msg.message,
            user_id: msg.user_id,
            user: msg.user,
            createdAt: new Date(msg.createdAt).toISOString(),
          };
          addMessage(newMessage);
        }
      );
    }
  }, [socket]);

  useLayoutEffect(() => {
    if (messages) {
      setNewMessage('');
      chatEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (initialLoad && messages.length > 0) {
      setInitialLoad(false); // Set to false after the first scroll
    }
  }, [messages, initialLoad]);

  const fetchDataMessage = (page = 1, limit = 5) => {
    return axiosWithAuth
      .get(`chat/${team_id}?page=${page}&limit=${limit}`)
      .then(({ data }) => data.data)
      .catch((error) => {});
  };

  const { isFetching } = useQuery<string[], Error>(
    ['dataMessage', page, limit],
    () => fetchDataMessage(page, limit),
    {
      onSuccess: (newData) => {
        newData = newData.reverse();
        setMessages([...newData, ...messages] as Message[]);
        setHasMore(newData.length > 0);
        setRendered(true);
      },
    }
  );

  const firstMessageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching || !rendered) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore, rendered]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let message = newMessage.trim();

    if (message && team_id && message != '') {
      const payload = {
        message,
        team_id,
      };
      sendMessage(payload);
      setNewMessage('');
      // TODO: perbaiki untuk payloading baiknya menggunakan uuid di id nya
      let newMessage: Message = {
        id: new Date().toISOString(),
        message: message,
        user_id: user?.user_id,
        user: user,
        createdAt: new Date().toISOString(),
      };
      addMessage(newMessage);
    }
  };

  return (
    <div className="border rounded-md flex-1 h-[60%] flex flex-col bg-slate-50 shadow-sm">
      {/* header */}
      <div className="2xl:p-5 xl:p-3 flex justify-between items-center h-fit border-b">
        <h3 className="font-semibold text-lg">Live Chat</h3>

        <div className="flex gap-4 items-center">
          <div
            className={`w-2 h-2 rounded-full ${
              status == 'Connected'
                ? 'bg-emerald-500'
                : status == 'Failed to connect'
                ? 'bg-red-500'
                : 'bg-slate-500'
            }`}
          ></div>
          <span className="text-sm opacity-75">
            {userActive?.totalUser} {'/'}
            {userActive?.totalUserActive}{' '}
            {status == 'Connected' ? 'Online' : 'Offline'}
          </span>
          <FontAwesomeIcon
            className="text-slate-500 cursor-pointer hover:opacity-70 transition-all duration-150"
            icon={faEllipsisVertical}
          />
        </div>
      </div>
      {/* chat list */}
      <div className="2xl:p-5 xl:p-3 pb-14 w-full bg-emerald-100 bg-opacity-15 border relative flex-1 overflow-hidden">
        <div className="max-h-full overflow-y-scroll w-scroll-3">
          {user &&
            messages &&
            messages?.map((data: Message, index: any) => (
              <div
                ref={
                  index === messages.length - 1
                    ? chatEndRef
                    : index == 0
                    ? firstMessageElementRef
                    : null
                }
                key={index}
                className={`${
                  user?.user_id === data.user_id
                    ? 'chat chat-end'
                    : 'chat chat-start'
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={
                        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                      }
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                      className="!relative"
                    />
                  </div>
                </div>
                <div className="chat-header text-xs mr-2 mb-1">
                  {data?.user?.fullname}
                  <time className="text-xs opacity-50 ml-1">
                    {moment(data?.createdAt).format('h:mm:ss')}
                  </time>
                </div>
                <div className="chat-bubble text-sm bg-[#286E6A]">
                  {data?.message}
                </div>
                <div className="chat-footer opacity-50 text-xs hidden">
                  Delivered
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* input */}
      <div className="bottom-0 left-0 w-full p-1">
        <div className="rounded-md w-full">
          <form onSubmit={handleSubmit} className="relative w-full h-full">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              name="message"
              type="text"
              placeholder="Type here"
              className="input input-bordered focus:outline-none focus:border-emerald-700 w-full rounded-md"
            />
            <div className="absolute top-0 right-2 h-full flex items-center">
              <button type="submit" className="p-1.5 bg-[#286E6A] rounded-md">
                <svg
                  className="fill-white"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  id="Flat"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M231.626,128a16.015,16.015,0,0,1-8.18262,13.96094L54.53027,236.55273a15.87654,15.87654,0,0,1-18.14648-1.74023,15.87132,15.87132,0,0,1-4.74024-17.60156L60.64746,136H136a8,8,0,0,0,0-16H60.64746L31.64355,38.78906A16.00042,16.00042,0,0,1,54.5293,19.44727l168.915,94.59179A16.01613,16.01613,0,0,1,231.626,128Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
