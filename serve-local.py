#!/usr/bin/env python3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json,time,subprocess,re
from urllib.parse import unquote,urlsplit
ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs): super().__init__(*args,directory=str(ROOT),**kwargs)
    def allowed(self):
        relative=unquote(urlsplit(self.path).path).lstrip('/')
        target=(ROOT/relative).resolve()
        if not target.is_relative_to(ROOT): return False
        parts=target.relative_to(ROOT).parts
        return not any(part.startswith('.') or part in ('__pycache__',) for part in parts) and not relative.startswith('bugmoog-stats/server') and relative != 'serve-local.py'
    def do_HEAD(self):
        if not self.allowed(): return self.send_error(404)
        return super().do_HEAD()
    def list_directory(self,path):
        return self.send_error(404)
    def do_GET(self):
        if not self.allowed(): return self.send_error(404)
        if urlsplit(self.path).path == '/':
            self.send_response(302);self.send_header('Location','/menu.html');self.end_headers();return
        api_path=urlsplit(self.path).path
        if re.fullmatch(r'/api/report/[0-9]+/[0-9]+/(hour|day|week)',api_path):
            try:
                url='https://d3txi12i3pqbxm.cloudfront.net/chet/bugmoog-stats'+api_path
                body=subprocess.run(['curl','-fsSL','--max-time','20',url],capture_output=True,check=True).stdout
                self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body)
            except Exception: self.send_error(502,'Statistics unavailable')
            return
        if api_path!='/weekly-popularity': return super().do_GET()
        try:
            end=int(time.time()*1000); start=end-7*86400000
            url=f'https://d3txi12i3pqbxm.cloudfront.net/chet/bugmoog-stats/api/report/{start}/{end}/hour'
            raw=subprocess.run(['curl','-fsSL','--max-time','20',url],capture_output=True,check=True).stdout
            report=json.loads(raw)
            if report.get('from')!=start or report.get('to')!=end: raise ValueError('Incorrect report range')
            games={row['subject']:row['opens'] for row in report['summary'] if row.get('event')=='game_open' and row.get('subject')}
            body=json.dumps({'from':start,'to':end,'games':games}).encode();status=200
        except Exception:
            body=b'{"error":"Weekly stats unavailable"}';status=502
        self.send_response(status);self.send_header('Content-Type','application/json');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body)
if __name__=='__main__': ThreadingHTTPServer(('127.0.0.1',8765),Handler).serve_forever()
