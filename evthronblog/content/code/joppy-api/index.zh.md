---
title: "Joppy Api"
description: 
date: 2024-08-13T21:57:32+08:00
lastmod: 2024-08-13T21:57:32+08:00
image: 
categories: 
tags: 
math: true
license: 
hidden: false
comments: true
---

https://github.com/marph91/joppy/tree/master/joppy





# joppy Delete, get, post, put

```python
    def delete(self, path: str) -> requests.models.Response:
        """Convenience method to issue a delete request."""
        return self._request("delete", path)

    def get(
        self, path: str, query: Optional[dt.JoplinKwargs] = None
    ) -> requests.models.Response:
        """Convenience method to issue a get request."""
        return self._request("get", path, query=query) #get 需要 query

    def post(
        self,
        path: str,
        data: Optional[dt.JoplinKwargs] = None,
        files: Optional[Dict[str, Any]] = None,
    ) -> requests.models.Response:
        """Convenience method to issue a post request."""
        return self._request("post", path, data=data, files=files) # post 需要 files 和 data

    def put(
        self, path: str, data: Optional[dt.JoplinKwargs] = None
    ) -> requests.models.Response:
        """Convenience method to issue a put request."""
        return self._request("put", path, data=data) # put 是什麼？
```


全部都是 _request 處理的，其他的 post, delete, get, put 只是指定 method

#### LOGGER.debug prints debug message
```python
class ApiBase:
    """Contains the basic requests of the REST API."""

    def __init__(self, token: str, url: str = "http://localhost:41184") -> None:
        self.url = url
        self.token = token

    def _request(
        self,
        method: str, # method 是 get / post / delete /put
        path: str,
        query: Optional[dt.JoplinKwargs] = None,
        data: Optional[dt.JoplinKwargs] = None,
        files: Optional[Dict[str, Any]] = None,
    ) -> requests.models.Response:
        LOGGER.debug(
            f"API: {method} request: path={path}, query={query}, data={data}, "
            f"files={files}"
        )
        if data is not None and "id_" in data:
			# change key id_ back to id?
            # "id" is a reserved keyword in python, so don't use it.
            data["id"] = data.pop("id_")
        if query is None:
	        # init empty query safely, use None when Optional
            query = {}
        query["token"] = self.token 
        #turn dictionary to query items urs tring
        query_str = "&".join([f"{key}={val}" for key, val in query.items()])
        # saber=excalibur&archer=unlimited_blade_works


        try:
            # getattr 得到 method, get / post / delete /put ，所以能連續用括號。神祕的黑盒子......
            response: requests.models.Response = getattr(SESSION, method)(
                f"{self.url}{path}?{query_str}", # 提供 url
                json=data,
                files=files,
            )
            LOGGER.debug(f"API: response {response.text}")
            # 如果出錯，raise exception
            response.raise_for_status()
        except requests.exceptions.HTTPError as err:
            err.args = err.args + (response.text,)
            raise
        return response
```



- Base API 
- Base Methods Classes based on Base API
- User friendly methods

python debug
{{LOGGER.debug}} prints debug message



### 1. Logging

```python
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Log some messages
logging.debug("This is a debug message.")
logging.info("This is an info message.")
logging.warning("This is a warning message.")
logging.error("This is an error message.")
logging.critical("This is a critical message.")
```

### 2. @staticmethod

A static method does not require access to the instance (self) or class (cls). It's just a method that belongs to the class and can be called without an instance.

```python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

result = MathUtils.add(5, 3)
print(result)  # Output: 8
```

### 3. Double Bracket (When the Function Returns a Callable Object)

Using double brackets can refer to a function that returns another function.

```python
def outer_function(message):
    def inner_function():
        print(message)
    return inner_function

func = outer_function("Hello, World!")
func()  # Outputs: Hello, World!
```

getattr(SESSION, method)

### 4. Type Objects (Optional, Union)

Using type hints to specify that a function parameter may be of multiple types.

```python
from typing import Optional, Union

def process_value(value: Union[int, str, None]) -> None:
    if isinstance(value, int):
        print(f"Integer: {value}")
    elif isinstance(value, str):
        print(f"String: {value}")
    else:
        print("No value provided.")

process_value(10)       # Outputs: Integer: 10
process_value("Hello")  # Outputs: String: Hello
process_value(None)     # Outputs: No value provided.
```

### 5. Requests (localhost)

Using the `requests` library to make an HTTP request to your local server.

```python
import requests

response = requests.get('http://localhost:5000')
print(response.text)  # Outputs the response from the localhost server.
```

### 6. `**kwargs`, Use Dictionary as Keyword Argument

Using `**kwargs` allows you to pass a variable number of keyword arguments to a function.

```python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="New York")
# Outputs:
# name: Alice
# age: 30
# city: New York
```

### 7. `{dict}.get()` as 'if exist, else'

Using the `get` method of a dictionary to return a value for a given key, with an option to specify a default value if the key does not exist.

```python
data = {"name": "Bob", "age": 25}

name = data.get("name", "Unknown")
occupation = data.get("occupation", "Not Specified")

print(name)         # Outputs: Bob
print(occupation)   # Outputs: Not Specified
```

Each of these examples illustrates the concept clearly, showcasing how each feature can be used in Python programming.