-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS entertainment;

-- Use the created database
USE entertainment;

-- Create tables
CREATE TABLE Kullanici (
    KullaniciID INT PRIMARY KEY,
    Ad VARCHAR(50),
    Soyad VARCHAR(50),
    Eposta VARCHAR(100),
    Cinsiyet VARCHAR(10),
    Email VARCHAR(100),
    Password VARCHAR(100),
    DogumTarihi DATE,
    Para INT -- Balance field added to Kullanici
);

CREATE TABLE Icerik (
    IcerikID INT PRIMARY KEY,
    Tur VARCHAR(50),
    Puan INT,
    SatinAlmaFiyati INT,
    KiralamaFiyati INT,
    YayinTarihi DATE
);

CREATE TABLE Kitap (
    KitapID INT PRIMARY KEY,
    Yazar VARCHAR(100),
    SayfaSayisi INT,
    FOREIGN KEY (KitapID) REFERENCES Icerik(IcerikID)
);

CREATE TABLE Film (
    FilmID INT PRIMARY KEY,
    Yoneten VARCHAR(100),
    FilmSuresi TIME,
    FOREIGN KEY (FilmID) REFERENCES Icerik(IcerikID)
);

CREATE TABLE Oyun (
    OyunID INT PRIMARY KEY,
    Gelistirici VARCHAR(100),
    Platform VARCHAR(50),
    FOREIGN KEY (OyunID) REFERENCES Icerik(IcerikID)
);

CREATE TABLE Kayit (
    KayitID INT PRIMARY KEY,
    KullaniciID INT,
    IcerikID INT,
    OdemeID INT,
    KayitTarihi DATE,
    FOREIGN KEY (KullaniciID) REFERENCES Kullanici(KullaniciID),
    FOREIGN KEY (IcerikID) REFERENCES Icerik(IcerikID)
    FOREIGN KEY (OdemeID) REFERENCES Odeme(OdemeID)
);

CREATE TABLE KiralamaKayit (
    KayitID INT PRIMARY KEY,
    KiralamaBitisTarihi DATE,
    FOREIGN KEY (KayitID) REFERENCES Kayit(KayitID)
);

CREATE TABLE SatinAlmaKayit (
    KayitID INT PRIMARY KEY,
    FOREIGN KEY (KayitID) REFERENCES Kayit(KayitID)
);

CREATE TABLE EngelKayit (
    KayitID INT PRIMARY KEY,
    FOREIGN KEY (KayitID) REFERENCES Kayit(KayitID)
);

CREATE TABLE Odeme (
    OdemeID INT PRIMARY KEY,
    KartNo VARCHAR(16),
    CVC VARCHAR(3),
    Yil INT,
    Ay INT,
    Miktar INT,
);

CREATE TABLE IstekListesi (
    KullaniciID INT,
    IcerikID INT,
    PRIMARY KEY (KullaniciID, IcerikID),
    FOREIGN KEY (KullaniciID) REFERENCES Kullanici(KullaniciID),
    FOREIGN KEY (IcerikID) REFERENCES Icerik(IcerikID)
);

CREATE TABLE Incelemeler (
    KullaniciID INT,
    IcerikID INT,
    Puan INT,
    PRIMARY KEY (KullaniciID, IcerikID),
    FOREIGN KEY (KullaniciID) REFERENCES Kullanici(KullaniciID),
    FOREIGN KEY (IcerikID) REFERENCES Icerik(IcerikID)
);

-- Insert sample data
INSERT INTO Kullanici (KullaniciID, Ad, Soyad, Eposta, Cinsiyet, Email, DogumTarihi, Para)
VALUES (1, 'Ahmet', 'Yilmaz', 'ahmet@example.com', 'Erkek', 'ahmet@example.com', '1985-05-12', 0);

INSERT INTO Icerik (IcerikID, IcerikAdi, Tur, Puan, SatinAlmaFiyati, KiralamaFiyati, YayinTarihi)
VALUES (1, 'Film A', 'Film', 85, 2000, 500, '2023-01-01');

INSERT INTO Film (FilmID, IcerikID, Yoneten, FilmSuresi)
VALUES (1, 1, 'Yonetmen A', '02:00:00');

INSERT INTO Kayit (KayitID, KullaniciID, IcerikID, KayitTarihi)
VALUES (1, 1, 1, '2023-01-02');

INSERT INTO KiralamaKayit (KayitID, KiralamaBitisTarihi)
VALUES (1, '2023-01-05');

INSERT INTO Odeme (KartNo, KullaniciID, CVC, Yil, Ay, Miktar)
VALUES ('1234567890123456', 1, '123', 2023, 12, 2000);

-- Update Kullanici balance
UPDATE Kullanici
SET Para = Para + 2000
WHERE KullaniciID = 1;
