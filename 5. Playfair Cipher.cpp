#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

char matrix[5][5];

void generateMatrix(string key) {
    bool used[26] = {false};
    key.erase(remove(key.begin(), key.end(), 'J'), key.end());
    string all = key + "ABCDEFGHIKLMNOPQRSTUVWXYZ";

    int idx = 0;
    for (char c : all) {
        c = toupper(c);
        if (!used[c - 'A']) {
            matrix[idx/5][idx%5] = c;
            used[c - 'A'] = true;
            idx++;
        }
    }
}

pair<int,int> findPos(char c) {
    if (c=='J') c='I';
    for (int i=0;i<5;i++)
        for (int j=0;j<5;j++)
            if (matrix[i][j]==c) return {i,j};
    return {0,0};
}

string encryptPlayfair(string text) {
    string res="";
    for (int i=0;i<text.size();i+=2) {
        char a=text[i], b=(i+1<text.size()?text[i+1]:'X');
        if (a==b) b='X';
        auto [r1,c1]=findPos(a);
        auto [r2,c2]=findPos(b);
        if (r1==r2) {
            res+=matrix[r1][(c1+1)%5];
            res+=matrix[r2][(c2+1)%5];
        } else if (c1==c2) {
            res+=matrix[(r1+1)%5][c1];
            res+=matrix[(r2+1)%5][c2];
        } else {
            res+=matrix[r1][c2];
            res+=matrix[r2][c1];
        }
    }
    return res;
}

string decryptPlayfair(string text) {
    string res="";
    for (int i=0;i<text.size();i+=2) {
        char a=text[i], b=text[i+1];
        auto [r1,c1]=findPos(a);
        auto [r2,c2]=findPos(b);
        if (r1==r2) {
            res+=matrix[r1][(c1+4)%5];
            res+=matrix[r2][(c2+4)%5];
        } else if (c1==c2) {
            res+=matrix[(r1+4)%5][c1];
            res+=matrix[(r2+4)%5][c2];
        } else {
            res+=matrix[r1][c2];
            res+=matrix[r2][c1];
        }
    }
    return res;
}

int main() {
    generateMatrix("KEYWORD");
    string s="HELLO";
    string enc=encryptPlayfair(s);
    string dec=decryptPlayfair(enc);
    cout<<"Encrypt: "<<enc<<"\nDecrypt: "<<dec;
}
