#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

string encryptTrans(string text, string key) {
    int col = key.size();
    int row = (text.size() + col - 1) / col;
    text.append(row * col - text.size(), 'X'); // padding

    vector<pair<char,int>> order;
    for (int i = 0; i < col; i++) order.push_back({key[i], i});
    sort(order.begin(), order.end());

    string res = "";
    for (auto p : order) {
        for (int r = 0; r < row; r++) {
            res += text[r * col + p.second];
        }
    }
    return res;
}

string decryptTrans(string text, string key) {
    int col = key.size();
    int row = (text.size() + col - 1) / col;

    vector<pair<char,int>> order;
    for (int i = 0; i < col; i++) order.push_back({key[i], i});
    sort(order.begin(), order.end());

    string grid(row * col, ' ');
    int idx = 0;
    for (auto p : order) {
        for (int r = 0; r < row; r++) {
            grid[r * col + p.second] = text[idx++];
        }
    }
    return grid;
}

int main() {
    string s = "HELLOWORLD", key = "3142";
    string enc = encryptTrans(s, key);
    string dec = decryptTrans(enc, key);
    cout << "Encrypt: " << enc << "\nDecrypt: " << dec;
}
