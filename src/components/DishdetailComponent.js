
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
   /* constructor(props) {
        super(props);
    }*/

    renderDish(dish) {
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

        renderComment(dish) {
            if (dish !=null && dish.comments !=null) {
                let opt = { year: 'numeric', month: 'short', day: 'numeric' };
                const commentList = dish.comments.map((i) => {
                    return(
                        <div key={i.id}>
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                <li>{i.comment}</li>
                                <li> --{i.author}, {new Date(i.date).toLocaleDateString("en-US", opt)}</li>
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

    render() {
       
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    {this.renderComment(this.props.selectedDish)}
                    </div>
                </div>
            </div>     
        )
    }
}
export default DishDetail;