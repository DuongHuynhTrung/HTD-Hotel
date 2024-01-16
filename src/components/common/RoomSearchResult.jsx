/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import RoomCard from "../room/RoomCard";
import RoomPaginator from "./RoomPaginator";

const RoomSearchResult = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(3);
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultPerPage);

  const handlePageChanges = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultPerPage;
  const endIndex = startIndex + resultPerPage;
  const paginatedResult = results.slice(startIndex, endIndex);

  return (
    <>
      {results.length > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Result</h5>
          <Row>
            {paginatedResult.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Row>
          <Row>
            {totalResults > resultPerPage && (
              <RoomPaginator
                currentPage={currentPage}
                onPageChange={totalPages}
                totalPages={handlePageChanges}
              />
            )}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default RoomSearchResult;
