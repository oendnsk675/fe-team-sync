type AType = {
  name: string;
  username: string;
  img: string;
};

const Avatar = ({ name, username, img }: AType) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <span className="text-sm">{name}</span>
        <span className="text-sm block text-end text-slate-600">
          @{username}
        </span>
      </div>
      <div className="avatar online">
        <div className="w-10 h-10 rounded-xl">
          <img src={img} alt={`${username} avatar`} />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
