import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2 } from "lucide-react";
import "./App.css";
import Products from "./Pages/ProductDisplay/Products";

const ITEMS_PER_PAGE = 5;

function App() {
  return(
    <><Products/></>
  )
}

export default App;
