#include <iostream>
using namespace std;

int modInverse(int a, int m) {
    a %= m;
    for (int x = 1; x < m; x++)
        if ((a * x) % m == 1) return x;
    return -1;
}

string encryptAffine(string text, int a, int b) {
    string res = "";
    for (char c : text) {
        if (isalpha(c)) {
            char base = isupper(c) ? 'A' : 'a';
            res += (a * (c - base) + b) % 26 + base;
        } else res += c;
    }
    return res;
}

string decryptAffine(string text, int a, int b) {
    string res = "";
    int a_inv = modInverse(a, 26);
    for (char c : text) {
        if (isalpha(c)) {
            char base = isupper(c) ? 'A' : 'a';
            res += (a_inv * ((c - base - b + 26)) % 26) + base;
        } else res += c;
    }
    return res;
}

int main() {
    string s = "HELLO";
    int a = 5, b = 8;
    string enc = encryptAffine(s, a, b);
    string dec = decryptAffine(enc, a, b);
    cout << "Encrypt: " << enc << "\nDecrypt: " << dec;
}
