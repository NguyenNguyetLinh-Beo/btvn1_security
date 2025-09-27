#include <iostream>
using namespace std;

string encryptCaesar(string text, int k) {
    string res = "";
    for (char c : text) {
        if (isalpha(c)) {
            char base = isupper(c) ? 'A' : 'a';
            res += (c - base + k) % 26 + base;
        } else res += c;
    }
    return res;
}

string decryptCaesar(string text, int k) {
    return encryptCaesar(text, 26 - k);
}

int main() {
    string s = "HELLO";
    int key = 3;
    string enc = encryptCaesar(s, key);
    string dec = decryptCaesar(enc, key);
    cout << "Encrypt: " << enc << "\nDecrypt: " << dec;
}