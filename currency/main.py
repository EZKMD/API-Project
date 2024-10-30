from bs4 import BeautifulSoup
import string

with open("currency.html", "r", encoding="utf-8") as file:
    soup = BeautifulSoup(file, "html.parser")

a_tags = soup.find_all("div", class_="sc-9c25c373-9")

#print(a_tags)

i=0

currencyArray = []

while i < len(a_tags):
    textContent = a_tags[i].text.strip()
    if len(textContent) > 0:
        if textContent[0] in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "f", "a", "e"]:
            pass
        else:
            with open("currency.txt", "a", encoding="utf-8") as file:
                file.write(f"{textContent}\n")
                currencyArray.append(textContent)
    else:
        pass
    i +=1

finalArray = []

trollop = {}

for i in range(0, len(currencyArray), 4):
    # dictToAdd = {
    #     "name":currencyArray[i],
    #     "code":currencyArray[i+1].lower(),
    #     "symbol":currencyArray[i+2]
    # }
    
    trollop[currencyArray[i+1].lower()]=currencyArray[i+2]
    finalArray.append(currencyArray[i+1].lower()) 
    #finalArray.append(dictToAdd)

print(finalArray)



#print(currencyArray)
x=[]
arrayForDict = []

for i in range(0, len(currencyArray)):
    if len(currencyArray[i]) > 3:
        currencyName = currencyArray[i]
        arrayForDict.append(currencyName)
        #print(currencyName)

    elif len(currencyArray[i]) == 3:
        supposedCode = currencyArray[i]
        if supposedCode == supposedCode.upper() and supposedCode[len(supposedCode)-1] in list(string.ascii_uppercase):
            currencyCode = currencyArray[i]
            arrayForDict.append(currencyCode)
        else:
            currencySymbol = currencyArray[i]
            arrayForDict.append(currencySymbol)
        #print(currencyCode)
    else:
        if currencyArray[i] not in arrayForDict:
            currencySymbol = currencyArray[i]
            arrayForDict.append(currencySymbol)
            #print(currencySymbol)
        else:
            pass
    
    if len(arrayForDict) > 2:
        dictToConvert = {
            "name":arrayForDict[0],
            "code":arrayForDict[1],
            "symbol":arrayForDict[2]

        }
        arrayForDict = []
        x.append(dictToConvert)
    else:
        pass

#print(x)
#print(dictToConvert)

