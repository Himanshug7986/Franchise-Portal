import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import session from "express-session";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import franchiseRoutes from "./routes/franchise.js";
import salesRoutes from "./routes/sales.js";
import Sales from "./models/Sales.js";



const app = express();

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

mongoose.connect("mongodb://localhost:27017/franchiseapp").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        listProperties: ['name', 'email', 'phone', 'location', 'locationOwnership', 'hasOtherFranchises', 'franchiseRequestStatus', 'requestDate'],
        showProperties: ['name', 'email', 'phone', 'location', 'locationOwnership', 'hasOtherFranchises', 'otherFranchiseLocationsDisplay', 'franchiseRequestStatus', 'requestDate', 'adminNotes', 'createdAt', 'updatedAt'],
        editProperties: ['franchiseRequestStatus', 'adminNotes'],
        properties: {
          password: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          location: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          locationOwnership: {
            isVisible: { list: true, filter: true, show: true, edit: false },
            availableValues: [
              { value: 'owned', label: 'Owned' },
              { value: 'rented', label: 'Rented' }
            ]
          },
          hasOtherFranchises: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          otherFranchiseLocationsDisplay: {
            isVisible: { list: false, filter: false, show: true, edit: false },
            type: 'string',
          },
          franchiseRequestStatus: {
            isVisible: { list: true, filter: true, show: true, edit: true },
            availableValues: [
              { value: 'pending', label: 'Pending' },
              { value: 'accepted', label: 'Accepted' },
              { value: 'rejected', label: 'Rejected' }
            ]
          }
        },
        actions: {
          edit: {
            before: async (request) => {
              if (request.payload?.franchiseRequestStatus) {
                return request;
              }
              return request;
            }
          }
        }
      }
    },
    {
      resource: Sales,
    }
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Franchise Admin Panel',
    logo: false,
  },
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      if (email === 'admin@franchise.com' && password === 'admin123') {
        return { email: 'admin@franchise.com' };
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: 'some-secret-password-change-in-production',
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: 'some-secret-password-change-in-production',
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    },
  }
);

app.use(adminJs.options.rootPath, adminRouter);

app.use("/api/auth", authRoutes);
app.use("/api/franchise", franchiseRoutes);
app.use("/api/sales", salesRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("AdminJS is available at http://localhost:3000/admin");
});
