import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
    super(props);
        this.state = {
            isModalOpen: false
        }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className = "form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating" 
                                
                                    placeholder="Rating"
                                    className = "form-control"
                                    validators= {{
                                        required
                                    }}>
                                    <option value="" selected disabled>Choose here</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor="author" md={12}>Your name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your name"
                                    className = "form-control"
                                    validators= {{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment" 
                                    rows ="6"
                                    className = "form-control"
                                    validators= {{
                                        required
                                    }}/>
                                <Errors
                                    className="text-danger"
                                    model=".comment"
                                    show="touched"
                                    messages={{
                                        required: 'Required'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )

    }

}

function RenderDish({dish}) {
    if (dish != null)
      return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card> 
      );         
    else
        return(
            <div></div>
        );
}
    
function RenderComments({comments}) {
    if (comments !=null) {
        const commentList = comments.map((i) => {
            return(
                <div key={i.id}>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <li>{i.comment}</li>
                        <li> --{i.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(i.date)))}</li>
                    </ul>
                </div>
            )
        })
        return (
            <div>
                {commentList}
                <CommentForm />
            </div>
        )
    }
    else
        return(
            <div></div>
        );
}

const DishDetail =(props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    );
}
export default DishDetail;