# Related houses / rentals
---




# API Endpoints:

## Resource URI: http://relatedhomes/v1/

</br>


## GET
----
</br>

**GET**:  /rentals
--
#### Description: returns a list of rentals
| Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|
|  200 Ok   | application/json |    Object       |

**Response**

```
[
    {
        "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "related_rentals": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf66je) ]",
        "primary_photo": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
        "owner": "ObjectId(5e841f9bde7b495901bf72nd)",
        "rentals_types": "apartment",
        "raters": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf12ac) ]",
        "avg_ratings": "4.19",
        "total_raters": "2344",
        "capacity_max": "4",
        "max_adult": "4",
        "rates": "266",
        "terms_types": "per night"
        "heading": "Supurb Lakeside Cottage",
        "subheading": "beautiful lake side view",
        "amenities": "[\"wifi\", \"free coffee\", \"daily cleaning service\" ]"
        "photos": "[\"https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg\"]",
        "created_date": "2014-06-25T00:00:00.000Z",
        "updated_date": "2014-06-25T00:00:00.000Z",
    },
    {
        "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "related_rentals": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf66je) ]",
        "primary_photo": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
        "owner": "ObjectId(5e841f9bde7b495901bf72nd)",
        "rentals_types": "apartment",
        "raters": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf12ac) ]",
        "avg_ratings": "4.19",
        "total_raters": "2344",
        "capacity_max": "4",
        "max_adult": "4",
        "rates": "266",
        "terms_types": "per night"
        "heading": "Supurb Lakeside Cottage",
        "subheading": "beautiful lake side view",
        "amenities": "[\"wifi\", \"free coffee\", \"daily cleaning service\" ]"
        "photos": "[\"https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg\"]",
        "created_date": "2014-06-25T00:00:00.000Z",
        "updated_date": "2014-06-25T00:00:00.000Z",
    },
]
```

</br>

**GET**: /rentals/:id
--
#### Description: returns the information about the requested listing
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json |     Object     |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve

**Response**

```
[
    {
        "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "related_rentals": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf66je) ]",
        "primary_photo": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
        "owner": "ObjectId(5e841f9bde7b495901bf72nd)",
        "rentals_types": "apartment",
        "raters": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf12ac) ]",
        "avg_ratings": "4.19",
        "total_raters": "2344",
        "capacity_max": "4",
        "max_adult": "4",
        "rates": "266",
        "terms_types": "per night"
        "heading": "Supurb Lakeside Cottage",
        "subheading": "beautiful lake side view",
        "amenities": "[\"wifi\", \"free coffee\", \"daily cleaning service\" ]"
        "photos": "[\"https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg\"]"
        "created_date": "2014-06-25T00:00:00.000Z",
        "updated_date": "2014-06-25T00:00:00.000Z",
    },
]
```


</br>

**GET**: /rentals/:id/ratings/
--
#### Description: returns rating information about the rental
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json |  Object        |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve



**Response**

```
[
    {
        "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "avg_ratings": "4.19",
        "total_raters": "2344"
        "raters": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf12ac) ]",
    },
]
```


**GET**: /rentals/:id/photos
--
#### Description: returns photos of the rental=
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json | Object         |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve


**Response**

```
[
    {
        "_id": "ObjectId('5e841f9bde7b495901bhd7778h')",
        "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "photos": "[\"https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg\"]"
    },
]
```


</br>




## POST
----
</br>


**POST**: /rentals/
--
#### Description: creates a rental listing

|  Body          | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  rental        |                  | application/json |     Object      |



```
| Response         |    MediaType     |      DataType   |
|------------------|------------------|-----------------|
|  200 Ok          | application/json |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```


</br>



**POST**: /rentals/ratings/
--
#### Description: creates a rental listing

|  Body     | Request          |    MediaType     |      DataType   |
|-----------|------------------|------------------|-----------------|
|  rating   |                  | application/json |     Number      |



```
| Response         |    MediaType             |      DataType   |
|------------------|--------------------------|-----------------|
|  200 Ok          |        application/json  |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```

</br>



## PATCH
----
</br>

**PATCH**: /rentals/:id/ratings/
--
#### Description: updates the rating of a rental

|  Body          | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  rating        |                  | application/json |     Object      |



```
| Response         |    MediaType             |      DataType   |
|------------------|--------------------------|-----------------|
|  200 Ok          |        application/json  |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```

</br>



## DELETE
----
</br>


**DELETE**: /rentals/:id
--
#### Description: deletes the rental identified by the id

|  Params        | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  id            |                  | application/json |     UUID        |

*{id} = the ID of the rental


```
| Response         |    MediaType             |      DataType   |
|------------------|--------------------------|-----------------|
|  200 Ok          |        application/json  |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```

</br>

