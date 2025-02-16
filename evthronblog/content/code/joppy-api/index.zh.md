---
title: "Joppy Api"
description: 
date: 2024-08-13T21:57:32+08:00
lastmod: 2024-08-13T21:57:32+08:00
image: 
categories: 
tags: 
math: 
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



requests.model.Response



dt.JoplinKwargs


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
			# switch key id_ back to id?
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


- Base API 
- Base Methods Classes based on Base API
- User friendly methods

python debug
{{LOGGER.debug}} prints debug message



- Logging
- @static method
- double bracket (when the function returns a callable object)
- Type objects (Optional, Union)
- Requests (localhost)
- ``** kwargs``, use dictionary as keyword argument
- {dict}.get() as 'if exist, else'
