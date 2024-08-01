const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            Home
          </a>
        </li>
        <li>
          <a>Documents</a>
        </li>
        <li>
          <span className="inline-flex items-center gap-2">Add Document</span>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
