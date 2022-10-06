import PropTypes from "prop-types";
import React from "react";
import { Button } from "reactstrap";
import { Col, Row } from "react-flexbox-grid";

const FeedbackInitialBar = ({ handleClick }) => (
  <div className="feedback-panel text-white">
    <div className="feedback-panel-stage-1 bg-secondary-beta ">
      <Row className="justify-content-between">
        <Col xs={12} lg={5}>
          <p>
            Is this page useful?
            <Button
              className="text-white btn-inline btn-sm"
              color="link"
              type="button"
              value="useful_yes"
              onClick={(e) => {
                handleClick(e.target.value);
              }}
            >
              Yes
            </Button>
            <Button
              className="text-white btn-inline btn-sm"
              color="link"
              onClick={(e) => {
                handleClick(e.target.value);
              }}
              type="button"
              value="useful_no"
            >
              No
            </Button>
          </p>
        </Col>
        <Col xs={12} lg={5} className="align-self-end">
          <p className="text-right">
            <Button
              className="text-white btn-inline btn-sm"
              type="button"
              color="link"
              value="improve"
              onClick={(e) => {
                handleClick(e.target.value);
              }}
            >
              Is there anything we can improve on this page +
            </Button>
          </p>
        </Col>
      </Row>
    </div>
  </div>
);
FeedbackInitialBar.propTypes = {
  handleClick: PropTypes.func.isRequired
};
export default FeedbackInitialBar;
