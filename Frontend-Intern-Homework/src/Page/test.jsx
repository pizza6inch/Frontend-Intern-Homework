import React, { useEffect, useRef, useState, useCallback } from "react";

function Test() {
  useEffect(() => {
    console.log("code");
  }, []);
  return (
    <>
      <h1>Test</h1>
    </>
  );
}

export default Test;
