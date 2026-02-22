import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();

  return <div>Book Details Page</div>;
};

export default BookDetails;
