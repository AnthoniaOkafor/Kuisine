import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


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

        function RenderComment({dish}) {
            if (dish !=null && dish.comments !=null) {
                const commentList = dish.comments.map((i) => {
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
                    <div>{commentList}</div>
                )
            }
            else
                return(
                    <div></div>
                );
        }

    const DishDetail =(props) => {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish ={props.selectedDish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment dish = {props.selectedDish} />
                    </div>
                </div>
            </div>     
        )
    }
export default DishDetail;