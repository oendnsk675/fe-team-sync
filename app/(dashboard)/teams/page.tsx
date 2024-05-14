import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="w-full px-8">
      {/* headerr */}
      <div className="flex items-center gap-4 mb-8 text-slate-600">
        <FontAwesomeIcon icon={faSitemap} size="lg" />
        <h1 className="text-xl font-semibold">Teams</h1>
      </div>

      {false && (
        <div className="w-full min-h-screen flex justify-center items-center -mt-10">
          <div className="flex flex-col items-center gap-4">
            <FontAwesomeIcon icon={faSitemap} size="4x" />
            <Link
              href={"/teams/add"}
              className="btn btn-primary btn-sm px-10 rounded hover:opacity-75 transition-all duration-150"
            >
              Add Team
            </Link>
          </div>
        </div>
      )}

      {true && (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
