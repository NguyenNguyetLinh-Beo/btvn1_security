# btvn1_security  
BÀI TẬP 1:
TÌM HIỂU CÁC PHƯƠNG PHÁP MÃ HOÁ CỔ ĐIỂN
Caesar
Affine
Hoán vị
Vigenère
Playfair
Với mỗi phương pháp, hãy tìm hiểu:

Tên gọi
Thuật toán mã hoá, thuật toán giải mã
Không gian khóa
Cách phá mã (mà không cần khoá)
Cài đặt thuật toán mã hoá và giải mã bằng code C++ và bằng html+css+javascript
1. Caesar
Tên gọi: Dịch chuyển chữ cái.
Mã hóa: C=(P+k mod26.
Giải mã: P=(C−k) mod26.
Không gian khóa: 26.
Phá mã: Thử hết 26 khóa, phân tích tần suất.
2. Affine
Tên gọi: Mã hóa tuyến tính.
Mã hóa:  C=(aP+b) mod26.
Giải mã: P=a^-1(C−b) mod26.
Không gian khóa: 312 (a phải nguyên tố cùng 26).
Phá mã: Thử cặp (a,b), phân tích tần suất.
3. Hoán vị (Columnar Transposition)
Tên gọi: Sắp xếp lại theo khóa.
Mã hóa: Viết theo bảng, đọc cột theo thứ tự khóa.
Giải mã: Điền lại cột → đọc hàng.
Không gian khóa: n! (n = số cột).
Phá mã: Thử khóa nhỏ, phân tích cấu trúc từ.
4. Vigenère
Tên gọi: Đa bảng Caesar.
Mã hóa: Ci = ( Pi+ Ki) mod26.
Giải mã:Pi = ( Ci-Ki ) mod26.
Không gian khóa:26^m (m = độ dài khóa).
Phá mã: Kasiski, Friedman → tìm độ dài khóa, tách thành Caesar.
5. Playfair
Tên gọi: Mã hóa theo cặp chữ (5x5).
Mã hóa: Quy tắc hàng, cột, hình chữ nhật.
Giải mã: Ngược lại các quy tắc.
Không gian khóa: 25! ≈ 2^84
Phá mã: Phân tích tần suất bigram.  
<img width="1904" height="915" alt="image" src="https://github.com/user-attachments/assets/861d5ac1-22d2-4109-b524-8bbf533084d4" />  
