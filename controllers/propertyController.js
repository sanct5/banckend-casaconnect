const express = require('express');
const Property = require('../models/PropertySchema');

const createProperty = async (req, res = express.request) => {
    const property = new Property(req.body);

    try {
        property.user = req.uid;

        const savedProperty = await property.save();

        res.json({
            ok: true,
            property: savedProperty,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            property: 'Internal Error',
        });
    }
};

const listProperties = async (req, res = express.request) => {
    try {
        const properties = await Property.find().populate('user', 'name');

        res.status(200).json({
            ok: true,
            properties,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            properties: 'Internal Error',
        });
    }
};

const updateProperty = async (req, res = express.request) => {
    const { id } = req.params;
    const { name, nightlyRate, description, environmentDescription, amenities, location, photos } = req.body;

    try {
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({
                ok: false,
                message: 'Property not found',
            });
        }

        property.name = name;
        property.nightlyRate = nightlyRate;
        property.description = description;
        property.environmentDescription = environmentDescription;
        property.amenities = amenities;
        property.location = location;
        property.photos = photos;

        await property.save();

        res.json({
            ok: true,
            property: property,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Internal Error',
        });
    }
};

const deleteProperty = async (req, res = express.request) => {
    const { id } = req.params;

    try {
        const property = await Property.findByIdAndDelete(id);

        if (!property) {
            return res.status(404).json({
                ok: false,
                message: 'Property not found',
            });
        }

        res.json({
            ok: true,
            message: 'Property deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Internal Error',
        });
    }
};

const getOneProperty = async (req, res = express.request) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id).populate('user', 'name');

        if (!property) {
            return res.status(404).json({
                ok: false,
                message: 'Property not found',
            });
        }

        res.status(200).json({
            ok: true,
            property,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Internal Error',
        });
    }
};

module.exports = {
    listProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    getOneProperty,
};
