import os
domain = "docs.pineconnector.com"

for file in os.listdir("text/" + domain + "/"):
    print(file[len(domain):-4])
