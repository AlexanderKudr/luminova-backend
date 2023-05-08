import requests
def searchPhotos(params: list[str, str]) -> list[str]:    
    cdnURL, query = params
    response = requests.get(cdnURL)
    storeFilePaths: list[str] = []
    for fileURL in response.text.split("\n"):
        if query in fileURL:
            storeFilePaths.append(fileURL)
    return storeFilePaths

cdnURL = "https://mycdn.com/photos/"
queryFromCDN = "beach"
photos: list[str] = searchPhotos(cdnURL, queryFromCDN)
print(photos)