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
Hình ảnh mã hóa  
<img width="1100" height="764" alt="image" src="https://github.com/user-attachments/assets/a622c097-2b38-4b95-a303-4e24150088aa" />  
Hình ảnh giải mã   
<img width="1124" height="729" alt="image" src="https://github.com/user-attachments/assets/c2a1042e-0a9a-4292-9528-9a4f21ed9182" />  
2. Affine  
Tên gọi: Mã hóa tuyến tính.  
Mã hóa:  C=(aP+b) mod26.    
Giải mã: P=a^-1(C−b) mod26.      
Không gian khóa: 312 (a phải nguyên tố cùng 26).    
Phá mã: Thử cặp (a,b), phân tích tần suất.

Hình ảnh mã hóa  
<img width="836" height="748" alt="image" src="https://github.com/user-attachments/assets/784a7d55-42a7-48db-b76a-1a4c52dd13d9" />  

Hình ảnh giải mã  
<img width="909" height="817" alt="image" src="https://github.com/user-attachments/assets/8f58868b-acc6-465f-87d2-90cd92c9edb8" />  
4. Hoán vị (Columnar Transposition)  
Tên gọi: Sắp xếp lại theo khóa.  
Mã hóa: Viết theo bảng, đọc cột theo thứ tự khóa.   
Giải mã: Điền lại cột → đọc hàng.   
Không gian khóa: n! (n = số cột).      
Phá mã: Thử khóa nhỏ, phân tích cấu trúc từ.   

Hình ảnh mã hóa  
<img width="914" height="726" alt="image" src="https://github.com/user-attachments/assets/dafc5ee2-3df5-4198-9b71-378aeee21566" />   

Hình ảnh giải mã  
<img width="1040" height="722" alt="image" src="https://github.com/user-attachments/assets/6bad7088-96ed-43c9-bbf8-65a75569d34d" />   
5. Vigenère  
Tên gọi: Đa bảng Caesar.  
Mã hóa: Ci = ( Pi+ Ki) mod26.  
Giải mã:Pi = ( Ci-Ki ) mod26.  
Không gian khóa:26^m (m = độ dài khóa).  
Phá mã: Kasiski, Friedman → tìm độ dài khóa, tách thành Caesar.  

Hình ảnh mã hóa   
<img width="1106" height="738" alt="image" src="https://github.com/user-attachments/assets/c0de3b68-ece6-4ad3-8dfd-6e8b17a9382c" />   

Hình ảnh giải mã  
<img width="1013" height="698" alt="image" src="https://github.com/user-attachments/assets/be01cc1b-cdf8-4649-9986-c945f94e35f4" />  
6. Playfair  
Tên gọi: Mã hóa theo cặp chữ (5x5).  
Mã hóa: Quy tắc hàng, cột, hình chữ nhật.  
Giải mã: Ngược lại các quy tắc.  
Không gian khóa: 25! ≈ 2^84  
Phá mã: Phân tích tần suất bigram.  

Hình ảnh mã hóa  
<img width="956" height="708" alt="image" src="https://github.com/user-attachments/assets/e74134c9-ddc3-406d-a109-34def5987a4f" />   

Hình ảnh giải mã  
<img width="1220" height="774" alt="image" src="https://github.com/user-attachments/assets/ec06d17b-471f-4d95-a7c3-b6f56ad99915" />  



