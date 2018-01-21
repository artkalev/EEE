import os
import sys

def main():
    print("started building")

    outFile = open( "build/EEE.js", "w" )
    outFile.write( "// built with python\n" );

    index = open("src/index.js", "r")

    for line in index:
        if "#include" in line:
            path = line.split('#include')[1].strip()
            print("adding file --> "+path)
            
            try:
                f = open("src"+"/"+path)
                outFile.write("\n/* src/"+path+" */\n\n")
                outFile.write( f.read() )
                outFile.write("\n")
                f.close()
            except FileNotFoundError:
                print("file "+path+" does not exist! moving on...")
                pass
    
    index.close()
    outFile.close()
    
    print("build succsessful")

if __name__ == "__main__":
    main()