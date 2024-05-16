require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const DATABASE_URL = process.env.CONNECTION_STRING;
const cluster = require("cluster");
const os = require("os");