const Content = () => {
    return (
      <div className="flex-1 bg-gray-900 p-5">
        <div className="flex items-center justify-between mb-5">
          <input
            type="text"
            placeholder="Search topics"
            className="bg-gray-700 p-2 rounded text-white w-1/2"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Filter
          </button>
        </div>
        <div className="flex">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Topics</h2>
            <div className="bg-gray-800 p-4 rounded mb-4">
              <p className="font-bold">John Smith</p>
              <p className="text-sm text-gray-400">on Topic - Technology</p>
              <p>Great insights, thanks</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <p className="font-bold">Emily Johnson</p>
              <p className="text-sm text-gray-400">on Topic - Food</p>
              <p>Interesting points, thanks</p>
            </div>
          </div>
          <div className="w-1/4 ml-5 bg-gray-800 p-4 rounded">
            <h3 className="font-bold mb-4">Sort by</h3>
            <ul>
              <li className="mb-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Discussions
                </label>
              </li>
              <li className="mb-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Favorites
                </label>
              </li>
            </ul>
            <div className="flex justify-between mt-5">
              <button className="bg-gray-700 px-4 py-2 rounded">Mark all</button>
              <button className="bg-gray-700 px-4 py-2 rounded">Clear all</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Content;
  