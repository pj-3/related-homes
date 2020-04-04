# Related houses 
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
|  200 Ok   | application/json | Array[ObjectId] |

**Response**

```
[
    {
        "_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "related_houses": "[1, 2, 4, 7, 20 ]",
        "houseId": "10",
        "photoSrc": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
        "bedsAndHouse": "Private Room - 3 beds(s)",
        "rating": "4.19 (2344)",
        "description": "Supurb Lakeside Cottage",
        "pricePerNight": "$266",
        "v1":{
            "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
            "related_rentals": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf66je) ]",
            "primary_photo": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
            "created_date": "2014-06-25T00:00:00.000Z",
            "updated_date": "2014-06-25T00:00:00.000Z",
            "owner": "ObjectId(5e841f9bde7b495901bf72nd)",
            "rentals_types": "apartment",
            "photo": {
                "_id": "ObjectId('5e841f9bde7b495901bhd7778h')",
                "photos": "[\"https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg\"]",
                "max": "8",
                "primary_photo_index": "1"
            },
            "capacity": {
                "types" "room:
                "occupancies": "4",
                "min": "1",
                "max": "4",
                "maxAdult": "4",
                "maxChildren": "0"
            },
            "description": {
                "heading": "Supurb Lakeside Cottage",
                "subheading": "beautiful lake side view",
                "amenities": "[\"wifi\", \"free coffee\", \"daily cleaning service\" ]"
            },
            "rating": {
                "raters": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf12ac) ]",
                "rate_types": "rental",
                "avg_ratings": "4.19",
                "total_raters": "2344"
            },
            "fees": {
                "rates": "266",
                "terms": "1",
                "term_types": "per night"
            },
        },
    },
    {
        "_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "related_houses": "[1, 2, 4, 7, 20 ]",
        "houseId": "10",
        "photoSrc": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
        "bedsAndHouse": "Private Room - 3 beds(s)",
        "rating": "4.19 (2344)",
        "description": "Supurb Lakeside Cottage",
        "pricePerNight": "$266",
        "v1":{
            "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
            "related_rentals": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf66je) ]",
            "primary_photo": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
            "created_date": "2014-06-25T00:00:00.000Z",
            "updated_date": "2014-06-25T00:00:00.000Z",
            "owner": "ObjectId(5e841f9bde7b495901bf72nd)",
            "rentals_types": "apartment",
            "photo": {
                "_id": "ObjectId('5e841f9bde7b495901bhd7778h')",
                "photos": "[\"https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg\"]",
                "max": "8"
                "primary_photo_index": "1"
            },
            "capacity": {
                "types" "room:
                "occupancies": "4",
                "min": "1",
                "max": "4",
                "maxAdult": "4",
                "maxChildren": "0"
            },
            "description": {
                "heading": "Supurb Lakeside Cottage",
                "subheading": "beautiful lake side view",
                "amenities": "[\"wifi\", \"free coffee\", \"daily cleaning service\" ]"
            },
            "rating": {
                "raters": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf12ac) ]",
                "rate_types": "rental",
                "avg_ratings": "4.19",
                "total_raters": "2344"
            },
            "fees": {
                "rates": "266",
                "terms": "1",
                "term_types": "per night"
            },
        },
    },
]
```

</br>

**GET**: /rentals/{id}
--
#### Description: returns the information about the requested listing
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json | Array[ObjectId] |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve

**Response**

```
[
    {
        "_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "related_houses": "[1, 2, 4, 7, 20 ]",
        "houseId": "10",
        "photoSrc": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
        "bedsAndHouse": "Private Room - 3 beds(s)",
        "rating": "4.19 (2344)",
        "description": "Supurb Lakeside Cottage",
        "pricePerNight": "$266",
        "v1":{
            "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
            "related_rentals": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf66je) ]",
            "primary_photo": "https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg",
            "created_date": "2014-06-25T00:00:00.000Z",
            "updated_date": "2014-06-25T00:00:00.000Z",
            "owner": "ObjectId(5e841f9bde7b495901bf72nd)",
            "rentals_types": "apartment",
            "photo": {
                "_id": "ObjectId('5e841f9bde7b495901bhd7778h')",
                "photos": "[\"https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg\"]",
                "max": "8"
                "primary_photo_index": "1"
            },
            "capacity": {
                "types" "room:
                "occupancies": "4",
                "min": "1",
                "max": "4",
                "maxAdult": "4",
                "maxChildren": "0"
            },
            "description": {
                "heading": "Supurb Lakeside Cottage",
                "subheading": "beautiful lake side view",
                "amenities": "[\"wifi\", \"free coffee\", \"daily cleaning service\" ]"
            },
            "rating": {
                "raters": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf12ac) ]",
                "rate_types": "rental",
                "avg_ratings": "4.19",
                "total_raters": "2344"
            },
            "fees": {
                "rates": "266",
                "terms": "1",
                "term_types": "per night"
            },
        },
    },
]
```


</br>

**GET**: /ratings/rentals/{id}
--
#### Description: returns rating information about the rental
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json | Array[ObjectId] |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve



**Response**

```
[
    {
        "_id": "ObjectId('5e841f9bde7b495901bhhe77s')",
        "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "raters": "[ ObjectId(5e841f9bde7b495901bf12ac), ObjectId(5e841f9bde7b495901bf12ac) ]",
        "rate_types": "rental",
        "avg_ratings": "4.19",
        "total_raters": "2344"
    },
]
```


**GET**: /photos/rentals/{id}
--
#### Description: returns photos of the rental
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json | Array[ObjectId] |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve


**Response**

```
[
    {
        "_id": "ObjectId('5e841f9bde7b495901bhd7778h')",
        "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
        "photos": "[\"https://relaxly-photos.s3-us-west-1.amazonaws.com/whitehouse.jpg\"]",
        "max": "8",
        "primary": "1"
    },
]
```


</br>


**GET**: /descriptions/rentals/{id}
--
#### Description: returns descriptive information about the rental
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json | Array[ObjectId] |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve



**Response**

```
[
    {
      "_id": "ObjectId('5e841f9bde7b495901bhd16s')",
      "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
      "heading": "Supurb Lakeside Cottage",
      "subheading": "beautiful lake side view",
      "amenities": "[\"wifi\", \"free coffee\", \"daily cleaning service\" ]"
    },
]
```


</br>

**GET**: /capacity/rentals/{id}
--
#### Description: returns capacity information about the rental
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json | Array[ObjectId] |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve



**Response**

```
[
    {
      "_id": "ObjectId('5e841f9bde7b495901bhd16s')",
      "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
      "heading": "Supurb Lakeside Cottage",
      "subheading": "beautiful lake side view",
      "amenities": "[\"wifi\", \"free coffee\", \"daily cleaning service\" ]"
    },
]
```


</br>


**GET**: /fees/rentals/{id}
--
#### Description: returns capacity information about the rental
|  Params   | Response  |    MediaType     |      DataType   |
|-----------|------------------|-----------------|-----------------|
|  id       |  200 Ok          | application/json | Array[ObjectId] |
|  Number   |  404 Not Found   | 
|   1       |  

*{id} = the ID of the rental to retrieve



**Response**

```
[
    {
      "_id": "ObjectId('5e841f9bde7b495901bjhdj2')",
      "rentals_id": "ObjectId('5e841f9bde7b495901bf12ac')",
      "rates": "266",
      "terms": "1",
      "term_types": "per night"
    },
]
```


</br>



## PATCH
----
</br>


**POST**: /rentals/{rental}
--
#### Description: creates a rental listing

|  Params        | Request          |    MediaType     |      DataType   |
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



**POST**: /ratings/rentals/{rating}
--
#### Description: creates a rental listing

|  Params   | Request          |    MediaType     |      DataType   |
|-----------|------------------|------------------|-----------------|
|  rating   |                  | application/json |    Object       |



```
| Response         |    MediaType             |      DataType   |
|------------------|--------------------------|-----------------|
|  200 Ok          |        application/json  |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```

</br>



**POST**: /descriptions/rentals/{description}

--
#### Description: creates description information for the rental

|  Params        | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  description   |                  | application/json |     Object      |



```
| Response         |    MediaType             |      DataType   |
|------------------|--------------------------|-----------------|
|  200 Ok          |        application/json  |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```

</br>



**POST**: /capacity/rentals/{capacity}
--
#### Description: creates capacity information for the rental

|  Params        | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  capacity      |                  | application/json |     Object      |



```
| Response         |    MediaType             |      DataType   |
|------------------|--------------------------|-----------------|
|  200 Ok          |        application/json  |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```

</br>


**POST**: /fees/rentals/{fees}
--
#### Description: creates capacity information for the rental

|  Params        | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  fees          |                  | application/json |     Object      |



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

**PATCH**: /ratings/rentals/{rating}
--
#### Description: updates the rating of a rental

|  Params        | Request          |    MediaType     |      DataType   |
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




**PATCH**: /descriptions/rentals/{description}
--
#### Description: updates the description of a rental

|  Params        | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  description   |                  | application/json |     Object      |


```
| Response         |    MediaType             |      DataType   |
|------------------|--------------------------|-----------------|
|  200 Ok          |        application/json  |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```

</br>



**PATCH**: /capacity/rentals/{capacity}
--
#### Description: updates the capacity of a rental

|  Params        | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  capacity      |                  | application/json |     Object      |


```
| Response         |    MediaType             |      DataType   |
|------------------|--------------------------|-----------------|
|  200 Ok          |        application/json  |     Object      |
|  400 Bad Request | 
|  403 Forbidden   | 
|  404 Not Found   | 
```

</br>



**PATCH**: /fees/rentals/{fees}
--
#### Description: updates the fees of a rental

|  Params        | Request          |    MediaType     |      DataType   |
|----------------|------------------|------------------|-----------------|
|  fees       |                  | application/json |     Object      |



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


**DELETE**: /rentals/{id}
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

