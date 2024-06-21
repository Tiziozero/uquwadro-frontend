import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, parse_qs

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')  # Add this line
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        query_params = parse_qs(parsed_path.query)
        url = query_params.get('url', [None])[0]

        if url:
            image_links = self.get_image_links(url)
            response = json.dumps(image_links)
            print(response)
        else:
            response = json.dumps({"error": "No URL provided"})

        self._set_headers()
        self.wfile.write(response.encode('utf-8'))

    def get_image_links(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            img_tags = soup.find_all('img')
            img_urls = [{"link": img.get('src')} for img in img_tags if img.get('src')]
            return img_urls
        except requests.exceptions.RequestException as e:
            return [{"error": str(e)}]

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8081):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting http server on port {port}')
    httpd.serve_forever()

if __name__ == "__main__":
    run()

