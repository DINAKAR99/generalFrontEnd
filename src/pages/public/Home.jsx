import React, { useEffect, useState } from "react";
import PublicLayout from "../../Layouts/PublicLayout";
import { LinearProgress, Skeleton } from "@mui/material";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
const Home = () => {
  return (
    <div>
      <PublicLayout>
        <div className="container mt-5">
          <h1 className="text-center mb-4">Welcome </h1>

          {/* <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top"
                  alt="Card 1"
                />
                <div className="card-body">
                  <h5 className="card-title">Feature 1</h5>
                  <p className="card-text">
                    This is a brief description of feature 1. It provides
                    valuable information.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top"
                  alt="Card 2"
                />
                <div className="card-body">
                  <h5 className="card-title">Feature 2</h5>
                  <p className="card-text">
                    This is a brief description of feature 2. It provides
                    valuable information.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top"
                  alt="Card 3"
                />
                <div className="card-body">
                  <h5 className="card-title">Feature 3</h5>
                  <p className="card-text">
                    This is a brief description of feature 3. It provides
                    valuable information.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div> */}

          <div className="text-center my-5">
            <h2>Our Services</h2>
            <p>We offer a variety of services to cater to your needs.</p>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Service 1</h5>
                    <p className="card-text">Description of service 1.</p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Service 2</h5>
                    <p className="card-text">Description of service 2.</p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Service 3</h5>
                    <p className="card-text">Description of service 3.</p>
                    <a href="#" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center my-5">
            <h2>Testimonials</h2>
            <p>What our clients say about us.</p>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      "Amazing service! Highly recommend."
                    </p>
                    <h6 className="card-title">- Client 1</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      "A wonderful experience from start to finish."
                    </p>
                    <h6 className="card-title">- Client 2</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      "I will definitely use their services again!"
                    </p>
                    <h6 className="card-title">- Client 3</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  );
};

export default Home;
