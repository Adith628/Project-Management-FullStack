"use client";
import React, { useEffect, useState } from "react";
import { useSearchQuery } from "../../state/api";
import { debounce } from "lodash";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div className="">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          name=""
          id=""
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {error && (
          <p className="text-red-500">
            Error occured while fetching search results.
          </p>
        )}
        {!isLoading && !error && searchResults && (
          <div className="">
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => {
              return <TaskCard key={task.id} task={task} />;
            })}
            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchResults.projects?.map((project) => {
              return <ProjectCard key={project.id} project={project} />;
            })}
            {searchResults.users && searchResults.users?.length > 0 && (
              <h2>Users</h2>
            )}
            {searchResults.users?.map((user) => {
              return <UserCard key={user.userId} user={user} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
