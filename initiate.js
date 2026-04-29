{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 javascript:(async function()\{let isMobile = window.matchMedia("(pointer:coarse)").matches;let isRugmoog = (window.location.hostname === "rugmoog.github.io");if ((!isRugmoog) || (!isMobile)) \{const r=await fetch("https://pugmoog.github.io/Bugmoog/menu.html");const h=await r.text();document.open();document.write(h);document.close();\} else \{  alert("Please dont use BugMoog on rugmoog.github.io. Use it on MyAccess instead.");\}\})();}