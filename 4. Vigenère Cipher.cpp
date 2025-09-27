#include <iostream>
using namespace std;

string encryptVigenere(string text, string key) {
    string res = "";
    for (int i = 0; i < text.size(); i++) {
        char c = text[i];
        if (isalpha(c)) {
            char base = isupper(c) ? 'A' : 'a';
            char k = tolower(key[i % key.size()]) - 'a';
            res += (c - base + k) % 26 + base;
        } else res += c;
    }
    return res;
}

string decryptVigenere(string text, string key) {
    string res = "";
    for (int i = 0; i < text.size(); i++) {
        char c = text[i];
        if (isalpha(c)) {
            char base = isupper(c) ? 'A' : 'a';
            char k = tolower(key[i % key.size()]) - 'a';
            res += (c - base - k + 26) % 26 + base;
        } else res += c;
    }
    return res;
}

int main() {
    string s = "HELLO", key = "KEY";
    string enc = encryptVigenere(s, key);
    string dec = decryptVigenere(enc, key);
    cout << "Encrypt: " << enc << "\nDecrypt: " << dec;
}

