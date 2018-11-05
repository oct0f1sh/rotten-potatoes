const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const Review = require('../models/review');

chai.use(chaiHttp);

const sampleReview = {
    "title": "New Review",
    "movie-title": "Bad movie",
    "description": "a bad movie"
}

describe('Reviews', () => {
    it('should index ALL reviews on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })

    it('should display new form on /reviews/new GET', (done) => {
        chai.request(server)
            .get('/reviews/new')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })

    it('should show a single review on /reviews/<id> GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                })
        })
    })
    
    it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                })
        })
    })

    it('should create a SINGLE review on /reviews POST', (done) => {
        chai.request(server)
            .post('/reviews')
            .send(sampleReview)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })

    it('should update a SINGLE review on /reviews/<id> PUT', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .put(`/reviews/${data._id}?_method=PUT`)
                .send({'title': 'Updating the title'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                })
        })
    })

    it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {
        var review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(server)
                .delete(`/reviews/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                })
        })
    })

    after(() => {
        Review.deleteMany({title: 'New Review'}).exec((err, reviews) => {
            console.log(reviews);
            reviews.remove();
        })
    })
})