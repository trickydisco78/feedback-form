import PropTypes from "prop-types";
import React from "react";
import { Col, Row } from "react-flexbox-grid";
import { Button, FormGroup, FormText, Input, Label } from "reactstrap";

const radioMessages = [
  {
    id: "suggestion",
    message: "There's missing or incorrect information on this page"
  },
  {
    id: "bug",
    message: "There's missing or incorrect information on this page"
  },
  {
    id: "incorrect",
    message: "There's missing or incorrect information on this page"
  }
];

const customInput = ({ inputType, dataID, id, eventFunc, name, message }) => {
  return (
    <FormGroup check className="py-3">
      <Label check>
        <Input
          defaultChecked
          type={inputType}
          data-id={dataID}
          name={name}
          id={id}
          onChange={(e) => eventFunc}
        />
        <p>{message}</p>
      </Label>
    </FormGroup>
  );
};

const FeedbackForm = ({ current, send }) => {
  const handleClick = (e) => send(e.target.value);

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  console.log(current.value);
  return (
    <div className="feedback-panel-stage-2-wrapper text-white">
      <form onSubmit={formSubmit} className="mw-100">
        <ContainerInner className="no-padding-lrg">
          <div className={`feedback-panel-stage-2  bg-primary`}>
            <Row className="border-bottom py-5 mb-3">
              <Col xs={12}>
                <h5 className="font-weight-bold">{`Help us Improve Discover my Benefits`}</h5>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <FormGroup tag="fieldset">
                  <FormGroup check className="py-3">
                    <Label check>
                      <Input
                        type="radio"
                        data-id="suggestion"
                        name="radio1"
                        id="SUGGESTION"
                        value="SUGGESTION"
                        checked={current.matches("formPanel.opened")}
                        onChange={(e) => handleClick(e)}
                      />
                      <p>
                        There's missing or incorrect information on this page
                      </p>
                    </Label>
                  </FormGroup>
                  <FormGroup check className="py-3">
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        data-id="bug"
                        id="bug"
                        value="BUG"
                        checked={current.matches("formPanel.bug")}
                        //onChange={e => send("CLICK_BUG")}
                        onChange={(e) => handleClick(e)}
                      />
                      <p>I came across a technical bug or issue</p>
                    </Label>
                  </FormGroup>
                  <FormGroup check className="py-3">
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        data-id="incorrect"
                        id="incorrect"
                        value="INCORRECT"
                        checked={current.matches("formPanel.incorrect")}
                        //onChange={e => send("CLICK_SUGGESTION")}
                        onChange={(e) => handleClick(e)}
                      />
                      <p>I have another suggestion to do with this page</p>
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col lg={8}>
                {current.matches("formPanel.suggestion") && (
                  <FormGroup>
                    <Label for="suggestionTextarea">
                      Tell us about what information is missing or incorrect on
                      this page
                    </Label>
                    <Input
                      onChange={(e) => this.handleChange(e)}
                      type="textarea"
                      name="suggestionTextarea"
                      data-route="suggestion"
                      id="suggestionTextarea"
                    />
                    <FormText className="text-white">
                      Missing information this needs to be hidden and shown only
                      if theres an error message!
                    </FormText>
                  </FormGroup>
                )}
                {current.matches("formPanel.bug") && (
                  <FormGroup>
                    <Row>
                      <Col lg={6}>
                        <Label for="bugTextarea">What were you doing?</Label>
                        <Input
                          onChange={(e) => this.handleChange(e)}
                          type="textarea"
                          data-route="bug"
                          name="bugTextareaL"
                          id="bugTextareaL"
                        />
                        <FormText className="text-white">
                          Missing information this needs to be hidden and shown
                          only if theres an error message!
                        </FormText>
                      </Col>
                      <Col lg={6}>
                        <Label for="bugTextareaR">What went wrong?</Label>
                        <Input
                          onChange={(e) => this.handleChange(e)}
                          type="textarea"
                          data-route="bug"
                          name="bugTextareaR"
                          id="bugTextareaR"
                        />
                        <FormText className="text-white">
                          Missing information this needs to be hidden and shown
                          only if theres an error message!
                        </FormText>
                      </Col>
                    </Row>
                  </FormGroup>
                )}
                {(current.matches("formPanel.incorrect") ||
                  current.matches("formPanel.opened")) && (
                  <FormGroup>
                    <Row>
                      <Col lg={12}>
                        <Label for="incorrectTextarea">
                          Tell us about your suggestion on this page so we can
                          improve the service
                        </Label>
                        <Input
                          onChange={(e) => this.handleChange(e)}
                          type="textarea"
                          data-route="incorrect"
                          name="incorrectTextarea"
                          id="incorrectTextarea"
                        />
                        <FormText className="text-white">
                          Missing information this needs to be hidden and shown
                          only if theres an error message!
                        </FormText>
                      </Col>
                    </Row>
                  </FormGroup>
                )}
                <FormGroup>
                  <Row>
                    <Col lg={6}>
                      <Button
                        type="submit"
                        className="btn-lg btn-block"
                        onClick={(e) => formSubmit(e)}
                      >
                        Send
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </ContainerInner>
      </form>
    </div>
  );
};
FeedbackForm.propTypes = {
  handleInitialFeedback: PropTypes.func.isRequired
};
export default FeedbackForm;

class ContainerInner extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div
        className={`container-inner ${
          this.props.class ? this.props.class : ""
        }`}
      >
        {children}
      </div>
    );
  }
}
