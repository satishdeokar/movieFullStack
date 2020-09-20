const Movie = require("../models/movieModel");
var mongoose = require('mongoose');
class fieldClass {
    constructor() {
        this.createMovie = this.createMovie.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.getMovie = this.getMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
    }
    async createMovie(req, res, next) {
        try {
            let addBody = {
                title: req.body.title,
                directorName: req.body.directorName,
                bannerUrl: req.body.bannerUrl,
                dateReleased: req.body.dateReleased,
                createdBy: mongoose.mongo.ObjectId(req.body.createdBy)
            };
             
            const movie = new Movie(addBody);
            return movie
                .save()
                .then(result => {
                    return res.status(200).json({
                        message: "Movie created!",
                        result: result,
                        status: 200
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        message: "Error to save movie",
                        errors: err,
                        status: 500
                    });
                });

        } catch (error) {
            return res.status(500).json({
                message: "Error to save record",
                error: error,
                status: 500
            });
        }
    }
    async getMovies(req, res, next) {
        try {
            const pageSize = +req.query.pagesize;
            const currentPage = +req.query.page;
            const MovieQuery = Movie.find();
            let fetchedMovies;
            if (pageSize && currentPage) {
                MovieQuery.skip(pageSize * (currentPage - 1)).limit(pageSize).sort('createdAt');
            }
            MovieQuery
                .then(documents => {
                    fetchedMovies = documents;
                    return Movie.count();
                })
                .then(count => {
                    res.status(200).json({
                        message: "Movies fetched successfully!",
                        data: fetchedMovies,
                        totalMovies: count,
                        status: 200
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Fetching Movie failed!",
                        error: error,
                        status: 500
                    });
                });
        } catch (error) {
            return res.status(500).json({
                message: "Error to get record",
                error: error,
                status: 500
            });
        }
    }
    
    async getMovie(req, res, next) {
        try {
            if (!req.query.id) {
                return res.status(404).json({
                    message: "Please enter request parameter!",
                    status: 404
                });
            }
            await Movie.findById(req.query.id)
                .then(movie => {
                    if (movie) {
                        res.status(200).json({
                            movie: movie,
                            status: 200
                        });
                    } else {
                        res.status(404).json({
                            message: "Movie not found!",
                            status: 404
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Fetching Movie failed!",
                        error: error,
                        status: 500
                    });
                });
        } catch (error) {
            return res.status(500).json({
                message: "Error to get record",
                error: error,
                status: 500
            });
        }

    }
    async deleteMovie(req, res, next) {
        try {
            await Movie.deleteOne({ _id: req.query.id })
                .then(result => {
                    if (result.n > 0) {
                        res.status(200).json({
                            message: "Deletion successful!",
                            status: 200
                        });
                    } else {
                        res.status(404).json({
                            message: "Deletion Faild!",
                            status: 404
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Delete  Field failed!",
                        status: 500
                    });
                });
        } catch (error) {
            res.status(500).json({
                message: "error to delete the field",
                error: error,
                status: 500
            })
        }
    }
    async updateMovie(req, res, next) {
        if (!req.query.id) {
            return res.status(404).json({
                message: "Please enter request parameter!",
                status: 404
            });
        }

        let updateBody = {
            _id: req.query.id,
            title: req.body.title,
            directorName: req.body.directorName,
            bannerUrl: req.body.bannerUrl,
            dateReleased: req.body.dateReleased,
            updatedBy: mongoose.mongo.ObjectId(req.body.updatedBy)
        }
        const movie = new Movie(updateBody);
        await Movie.updateOne({ _id: req.query.id }, movie)
            .then(result => {
                if (result.n > 0) {
                    res.status(200).json({
                        message: "Movie Updated successfully!",
                        status: 200
                    });
                } else {
                    res.status(404).json({
                        message: "Record not found",
                        status: 404
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: "Couldn't udpate Movie!",
                    error: error,
                    status: 500
                });
            });
    }

}

var fieldCl = new fieldClass();
module.exports = fieldCl;