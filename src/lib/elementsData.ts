// Cơ sở dữ liệu 118 Nguyên tố Hóa học Chuẩn IUPAC - HCC-ChemAI
import { ChemicalElement, MainCategory, SubCategory } from './elementsTypes';

export const ELEMENTS_DATA: ChemicalElement[] = [
  {
    "symbol": "H",
    "atomicNumber": 1,
    "nameEn": "Hydrogen",
    "nameVi": "Hiđro",
    "nameLatin": "Hydrogenium",
    "casNumber": "1333-74-0",
    "pubchemCid": 783,
    "etymology": "Đặt tên theo tiếng Latin \"Hydrogenium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 1,
    "group": 1,
    "groupTraditional": "IA",
    "block": "s",
    "mainCategory": "nonmetal",
    "subCategory": "reactive_nonmetal",
    "subCategoryNameVi": "Phi kim hoạt động",
    "atomicMass": 1.008,
    "electronConfigFull": "1s¹",
    "electronConfigShort": "1s¹",
    "energyLevels": [
      1
    ],
    "valenceElectrons": 1,
    "atomicRadiusEmpirical": 121,
    "covalentRadius": 111,
    "ionicRadius": "H⁺ / H²⁺: ~70 pm",
    "vanDerWaalsRadius": 181,
    "isotopes": [
      {
        "name": "^1H",
        "mass": 1.008,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "0.08988 g/L",
    "meltingPointC": -259.16,
    "boilingPointC": -252.87,
    "meltingPointK": 13.99,
    "boilingPointK": 20.28,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.2,
    "electronegativityAllen": 2.24,
    "electronegativityAllredRochow": 2.2,
    "ionizationEnergies": [
      1312
    ],
    "electronAffinity": 72.8,
    "oxidationStates": [
      -1,
      1
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (HO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (HCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Hydrogen.",
    "flameTestColor": "Xanh nhạt mờ",
    "flameTestHex": "#93c5fd",
    "abundance": {
      "crust": "100.00 ppm",
      "ocean": "10.000 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Henry Cavendish",
      "year": 1766,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "He",
    "atomicNumber": 2,
    "nameEn": "Helium",
    "nameVi": "Heli",
    "nameLatin": "Helium",
    "casNumber": "7440-59-7",
    "pubchemCid": 23987,
    "etymology": "Đặt tên theo tiếng Latin \"Helium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 1,
    "group": 18,
    "groupTraditional": "VIIIA",
    "block": "s",
    "mainCategory": "noble_gas",
    "subCategory": "noble_gas",
    "subCategoryNameVi": "Khí hiếm",
    "atomicMass": 4.0026,
    "electronConfigFull": "1s²",
    "electronConfigShort": "1s²",
    "energyLevels": [
      2
    ],
    "valenceElectrons": 0,
    "atomicRadiusEmpirical": 122,
    "covalentRadius": 112,
    "ionicRadius": "He⁺ / He²⁺: ~70 pm",
    "vanDerWaalsRadius": 182,
    "isotopes": [
      {
        "name": "^4He",
        "mass": 4.0026,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "0.1786 g/L",
    "meltingPointC": -272.2,
    "boilingPointC": -268.93,
    "meltingPointK": 0.95,
    "boilingPointK": 4.22,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      2372.3,
      5250.5
    ],
    "electronAffinity": 0,
    "oxidationStates": [
      0
    ],
    "commonOxidationStates": [
      0
    ],
    "reactivity": {
      "withOxygen": "Hoàn toàn trơ hóa học với oxy.",
      "withChlorine": "Không phản ứng.",
      "withHydrogen": "Không phản ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Không tác dụng.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Không tạo oxit và hydroxit bền.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Helium.",
    "flameTestColor": "Hồng ánh cam / vàng nhạt",
    "flameTestHex": "#fed7aa",
    "abundance": {
      "crust": "50.00 ppm",
      "ocean": "5.000 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Pierre Janssen & Norman Lockyer",
      "year": 1868,
      "country": "Pháp / Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Li",
    "atomicNumber": 3,
    "nameEn": "Lithium",
    "nameVi": "Liti",
    "nameLatin": "Lithium",
    "casNumber": "7439-93-2",
    "pubchemCid": 3028194,
    "etymology": "Đặt tên theo tiếng Latin \"Lithium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 2,
    "group": 1,
    "groupTraditional": "IA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkali_metal",
    "subCategoryNameVi": "Kim loại kiềm",
    "atomicMass": 6.94,
    "electronConfigFull": "1s² 2s¹",
    "electronConfigShort": "[He] 2s¹",
    "energyLevels": [
      2,
      1
    ],
    "valenceElectrons": 1,
    "atomicRadiusEmpirical": 123,
    "covalentRadius": 113,
    "ionicRadius": "Li⁺ / Li²⁺: ~70 pm",
    "vanDerWaalsRadius": 183,
    "isotopes": [
      {
        "name": "^7Li",
        "mass": 6.94,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "0.534 g/cm³",
    "meltingPointC": 180.5,
    "boilingPointC": 1342,
    "meltingPointK": 453.65,
    "boilingPointK": 1615.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.98,
    "electronegativityAllen": 1,
    "electronegativityAllredRochow": 0.98,
    "ionizationEnergies": [
      520.2,
      7298.1
    ],
    "electronAffinity": 59.6,
    "oxidationStates": [
      1
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (LiO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (LiCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Phản ứng mãnh liệt tỏa nhiệt lớn sinh H₂.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Lithium.",
    "flameTestColor": "Đỏ tươi carmine (Crimson)",
    "flameTestHex": "#e11d48",
    "abundance": {
      "crust": "33.33 ppm",
      "ocean": "3.333 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 3,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Johan August Arfwedson",
      "year": 1817,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Be",
    "atomicNumber": 4,
    "nameEn": "Beryllium",
    "nameVi": "Beri",
    "nameLatin": "Beryllium",
    "casNumber": "7440-41-7",
    "pubchemCid": 5460467,
    "etymology": "Đặt tên theo tiếng Latin \"Beryllium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 2,
    "group": 2,
    "groupTraditional": "IIA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkaline_earth",
    "subCategoryNameVi": "Kim loại kiềm thổ",
    "atomicMass": 9.0122,
    "electronConfigFull": "1s² 2s²",
    "electronConfigShort": "[He] 2s²",
    "energyLevels": [
      2,
      2
    ],
    "valenceElectrons": 2,
    "atomicRadiusEmpirical": 124,
    "covalentRadius": 114,
    "ionicRadius": "Be⁺ / Be²⁺: ~70 pm",
    "vanDerWaalsRadius": 184,
    "isotopes": [
      {
        "name": "^9Be",
        "mass": 9.0122,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "1.85 g/cm³",
    "meltingPointC": 1287,
    "boilingPointC": 2470,
    "meltingPointK": 1560.15,
    "boilingPointK": 2743.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.57,
    "electronegativityAllen": 1.6,
    "electronegativityAllredRochow": 1.57,
    "ionizationEnergies": [
      899.5,
      1757.1
    ],
    "electronAffinity": -50,
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (BeO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (BeCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Thể hiện tính chất lưỡng tính / phản ứng tan trong dung dịch kiềm giải phóng H₂."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Beryllium.",
    "flameTestColor": "Trắng sáng chói",
    "flameTestHex": "#f8fafc",
    "abundance": {
      "crust": "25.00 ppm",
      "ocean": "2.500 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Louis-Nicolas Vauquelin",
      "year": 1798,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "B",
    "atomicNumber": 5,
    "nameEn": "Boron",
    "nameVi": "Bo",
    "nameLatin": "Borium",
    "casNumber": "7440-42-8",
    "pubchemCid": 5462311,
    "etymology": "Đặt tên theo tiếng Latin \"Borium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 2,
    "group": 13,
    "groupTraditional": "IIIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "metalloid",
    "subCategoryNameVi": "Á kim (Metalloid)",
    "atomicMass": 10.81,
    "electronConfigFull": "1s² 2s² 2p¹",
    "electronConfigShort": "[He] 2s² 2p¹",
    "energyLevels": [
      2,
      3
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 125,
    "covalentRadius": 115,
    "ionicRadius": "B⁺ / B²⁺: ~70 pm",
    "vanDerWaalsRadius": 185,
    "isotopes": [
      {
        "name": "^11B",
        "mass": 10.81,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "2.34 g/cm³",
    "meltingPointC": 2076,
    "boilingPointC": 3927,
    "meltingPointK": 2349.15,
    "boilingPointK": 4200.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.04,
    "electronegativityAllen": 2.08,
    "electronegativityAllredRochow": 2.04,
    "ionizationEnergies": [
      800.6,
      2427.1
    ],
    "electronAffinity": 26.7,
    "oxidationStates": [
      -3,
      1,
      2,
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (BO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (BCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit và hydroxit lưỡng tính hoặc axit yếu.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Boron.",
    "flameTestColor": "Xanh lá cây tươi sáng (Bright green)",
    "flameTestHex": "#22c55e",
    "abundance": {
      "crust": "20.00 ppm",
      "ocean": "2.000 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Gay-Lussac & Thénard / Davy",
      "year": 1808,
      "country": "Pháp / Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "C",
    "atomicNumber": 6,
    "nameEn": "Carbon",
    "nameVi": "Cacbon",
    "nameLatin": "Carbonium",
    "casNumber": "7440-44-0",
    "pubchemCid": 5462310,
    "etymology": "Đặt tên theo tiếng Latin \"Carbonium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 2,
    "group": 14,
    "groupTraditional": "IVA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "reactive_nonmetal",
    "subCategoryNameVi": "Phi kim hoạt động",
    "atomicMass": 12.011,
    "electronConfigFull": "1s² 2s² 2p²",
    "electronConfigShort": "[He] 2s² 2p²",
    "energyLevels": [
      2,
      4
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 126,
    "covalentRadius": 116,
    "ionicRadius": "C⁺ / C²⁺: ~70 pm",
    "vanDerWaalsRadius": 186,
    "isotopes": [
      {
        "name": "^12C",
        "mass": 12.011,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "2.26 g/cm³",
    "meltingPointC": 3550,
    "boilingPointC": 4027,
    "meltingPointK": 3823.15,
    "boilingPointK": 4300.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.55,
    "electronegativityAllen": 2.6,
    "electronegativityAllredRochow": 2.55,
    "ionizationEnergies": [
      1086.5,
      2352.6
    ],
    "electronAffinity": 122,
    "oxidationStates": [
      -4,
      -2,
      2,
      4
    ],
    "commonOxidationStates": [
      -4,
      2,
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Carbon.",
    "flameTestColor": "Vàng cam có tàn than đỏ rực",
    "flameTestHex": "#f59e0b",
    "abundance": {
      "crust": "16.67 ppm",
      "ocean": "1.667 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Tiền sử / Lavoisier",
      "year": 1789,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "N",
    "atomicNumber": 7,
    "nameEn": "Nitrogen",
    "nameVi": "Nitơ",
    "nameLatin": "Nitrogenium",
    "casNumber": "7727-37-9",
    "pubchemCid": 947,
    "etymology": "Đặt tên theo tiếng Latin \"Nitrogenium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 2,
    "group": 15,
    "groupTraditional": "VA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "reactive_nonmetal",
    "subCategoryNameVi": "Phi kim hoạt động",
    "atomicMass": 14.007,
    "electronConfigFull": "1s² 2s² 2p³",
    "electronConfigShort": "[He] 2s² 2p³",
    "energyLevels": [
      2,
      5
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 127,
    "covalentRadius": 117,
    "ionicRadius": "N⁺ / N²⁺: ~70 pm",
    "vanDerWaalsRadius": 187,
    "isotopes": [
      {
        "name": "^14N",
        "mass": 14.007,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "1.2506 g/L",
    "meltingPointC": -210,
    "boilingPointC": -195.79,
    "meltingPointK": 63.15,
    "boilingPointK": 77.36,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 3.04,
    "electronegativityAllen": 3.1,
    "electronegativityAllredRochow": 3.04,
    "ionizationEnergies": [
      1402.3,
      2856
    ],
    "electronAffinity": -6.8,
    "oxidationStates": [
      -3,
      -2,
      -1,
      1,
      2,
      3,
      4,
      5
    ],
    "commonOxidationStates": [
      -3,
      3,
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (NO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (NCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Nitrogen.",
    "flameTestColor": "Tím / Xanh lam",
    "flameTestHex": "#818cf8",
    "abundance": {
      "crust": "14.29 ppm",
      "ocean": "1.429 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Daniel Rutherford",
      "year": 1772,
      "country": "Scotland",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "O",
    "atomicNumber": 8,
    "nameEn": "Oxygen",
    "nameVi": "Oxi",
    "nameLatin": "Oxygenium",
    "casNumber": "7782-44-7",
    "pubchemCid": 977,
    "etymology": "Đặt tên theo tiếng Latin \"Oxygenium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 2,
    "group": 16,
    "groupTraditional": "VIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "reactive_nonmetal",
    "subCategoryNameVi": "Phi kim hoạt động",
    "atomicMass": 15.999,
    "electronConfigFull": "1s² 2s² 2p⁴",
    "electronConfigShort": "[He] 2s² 2p⁴",
    "energyLevels": [
      2,
      6
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 128,
    "covalentRadius": 118,
    "ionicRadius": "O⁺ / O²⁺: ~70 pm",
    "vanDerWaalsRadius": 188,
    "isotopes": [
      {
        "name": "^16O",
        "mass": 15.999,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "1.429 g/L",
    "meltingPointC": -218.79,
    "boilingPointC": -182.96,
    "meltingPointK": 54.36,
    "boilingPointK": 90.19,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 3.44,
    "electronegativityAllen": 3.51,
    "electronegativityAllredRochow": 3.44,
    "ionizationEnergies": [
      1313.9,
      3388.3
    ],
    "electronAffinity": 141,
    "oxidationStates": [
      -2,
      -1,
      1,
      2
    ],
    "commonOxidationStates": [
      -2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (OO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (OCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Oxygen.",
    "flameTestColor": "Bùng cháy que đóm tàn đỏ",
    "flameTestHex": "#38bdf8",
    "abundance": {
      "crust": "12.50 ppm",
      "ocean": "1.250 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Scheele & Priestley",
      "year": 1774,
      "country": "Thụy Điển / Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "F",
    "atomicNumber": 9,
    "nameEn": "Fluorine",
    "nameVi": "Flo",
    "nameLatin": "Fluorum",
    "casNumber": "7782-41-4",
    "pubchemCid": 24524,
    "etymology": "Đặt tên theo tiếng Latin \"Fluorum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 2,
    "group": 17,
    "groupTraditional": "VIIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "halogen",
    "subCategoryNameVi": "Halogen",
    "atomicMass": 18.998,
    "electronConfigFull": "1s² 2s² 2p⁵",
    "electronConfigShort": "[He] 2s² 2p⁵",
    "energyLevels": [
      2,
      7
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 129,
    "covalentRadius": 119,
    "ionicRadius": "F⁺ / F²⁺: ~70 pm",
    "vanDerWaalsRadius": 189,
    "isotopes": [
      {
        "name": "^19F",
        "mass": 18.998,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "1.696 g/L",
    "meltingPointC": -219.67,
    "boilingPointC": -188.11,
    "meltingPointK": 53.48,
    "boilingPointK": 85.04,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 3.98,
    "electronegativityAllen": 4.06,
    "electronegativityAllredRochow": 3.98,
    "ionizationEnergies": [
      1681,
      3374.2
    ],
    "electronAffinity": 328.2,
    "oxidationStates": [
      -1
    ],
    "commonOxidationStates": [
      -1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (FO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (FCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Fluorine.",
    "flameTestColor": "Sáng chói vàng trắng",
    "flameTestHex": "#fef08a",
    "abundance": {
      "crust": "11.11 ppm",
      "ocean": "1.111 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Henri Moissan",
      "year": 1886,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ne",
    "atomicNumber": 10,
    "nameEn": "Neon",
    "nameVi": "Neon",
    "nameLatin": "Neon",
    "casNumber": "7440-01-9",
    "pubchemCid": 23935,
    "etymology": "Đặt tên theo tiếng Latin \"Neon\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 2,
    "group": 18,
    "groupTraditional": "VIIIA",
    "block": "p",
    "mainCategory": "noble_gas",
    "subCategory": "noble_gas",
    "subCategoryNameVi": "Khí hiếm",
    "atomicMass": 20.18,
    "electronConfigFull": "1s² 2s² 2p⁶",
    "electronConfigShort": "[He] 2s² 2p⁶",
    "energyLevels": [
      2,
      8
    ],
    "valenceElectrons": 0,
    "atomicRadiusEmpirical": 130,
    "covalentRadius": 120,
    "ionicRadius": "Ne⁺ / Ne²⁺: ~70 pm",
    "vanDerWaalsRadius": 190,
    "isotopes": [
      {
        "name": "^20Ne",
        "mass": 20.18,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "0.9002 g/L",
    "meltingPointC": -248.59,
    "boilingPointC": -246.08,
    "meltingPointK": 24.56,
    "boilingPointK": 27.07,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      2080.7,
      3952.3
    ],
    "electronAffinity": 0,
    "oxidationStates": [
      0
    ],
    "commonOxidationStates": [
      0
    ],
    "reactivity": {
      "withOxygen": "Hoàn toàn trơ hóa học với oxy.",
      "withChlorine": "Không phản ứng.",
      "withHydrogen": "Không phản ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Không tác dụng.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Không tạo oxit và hydroxit bền.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Neon.",
    "flameTestColor": "Đỏ cam rực rỡ (Neon Red)",
    "flameTestHex": "#fb923c",
    "abundance": {
      "crust": "10.00 ppm",
      "ocean": "1.000 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Ramsay & Travers",
      "year": 1898,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Na",
    "atomicNumber": 11,
    "nameEn": "Sodium",
    "nameVi": "Natri",
    "nameLatin": "Natrium",
    "casNumber": "7440-23-5",
    "pubchemCid": 5360545,
    "etymology": "Đặt tên theo tiếng Latin \"Natrium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 3,
    "group": 1,
    "groupTraditional": "IA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkali_metal",
    "subCategoryNameVi": "Kim loại kiềm",
    "atomicMass": 22.99,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s¹",
    "electronConfigShort": "[Ne] 3s¹",
    "energyLevels": [
      2,
      8,
      1
    ],
    "valenceElectrons": 1,
    "atomicRadiusEmpirical": 131,
    "covalentRadius": 121,
    "ionicRadius": "Na⁺ / Na²⁺: ~70 pm",
    "vanDerWaalsRadius": 191,
    "isotopes": [
      {
        "name": "^23Na",
        "mass": 22.99,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "0.968 g/cm³",
    "meltingPointC": 97.79,
    "boilingPointC": 882.94,
    "meltingPointK": 370.94,
    "boilingPointK": 1156.09,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.93,
    "electronegativityAllen": 0.95,
    "electronegativityAllredRochow": 0.93,
    "ionizationEnergies": [
      495.8,
      4562
    ],
    "electronAffinity": 52.8,
    "oxidationStates": [
      1
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (NaO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (NaCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Phản ứng mãnh liệt tỏa nhiệt lớn sinh H₂.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Sodium.",
    "flameTestColor": "Vàng tươi chói lọi (Yellow)",
    "flameTestHex": "#eab308",
    "abundance": {
      "crust": "9.09 ppm",
      "ocean": "0.909 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 3,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Humphry Davy",
      "year": 1807,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Mg",
    "atomicNumber": 12,
    "nameEn": "Magnesium",
    "nameVi": "Magie",
    "nameLatin": "Magnesium",
    "casNumber": "7439-95-4",
    "pubchemCid": 5462224,
    "etymology": "Đặt tên theo tiếng Latin \"Magnesium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 3,
    "group": 2,
    "groupTraditional": "IIA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkaline_earth",
    "subCategoryNameVi": "Kim loại kiềm thổ",
    "atomicMass": 24.305,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s²",
    "electronConfigShort": "[Ne] 3s²",
    "energyLevels": [
      2,
      8,
      2
    ],
    "valenceElectrons": 2,
    "atomicRadiusEmpirical": 132,
    "covalentRadius": 122,
    "ionicRadius": "Mg⁺ / Mg²⁺: ~70 pm",
    "vanDerWaalsRadius": 192,
    "isotopes": [
      {
        "name": "^24Mg",
        "mass": 24.305,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "1.738 g/cm³",
    "meltingPointC": 650,
    "boilingPointC": 1090,
    "meltingPointK": 923.15,
    "boilingPointK": 1363.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.31,
    "electronegativityAllen": 1.34,
    "electronegativityAllredRochow": 1.31,
    "ionizationEnergies": [
      737.7,
      1450.7
    ],
    "electronAffinity": -40,
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (MgO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (MgCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Magnesium.",
    "flameTestColor": "Trắng chói lòa (White)",
    "flameTestHex": "#ffffff",
    "abundance": {
      "crust": "8.33 ppm",
      "ocean": "0.833 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Humphry Davy",
      "year": 1808,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Al",
    "atomicNumber": 13,
    "nameEn": "Aluminium",
    "nameVi": "Nhôm",
    "nameLatin": "Aluminium",
    "casNumber": "7429-90-5",
    "pubchemCid": 5359268,
    "etymology": "Đặt tên theo tiếng Latin \"Aluminium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 3,
    "group": 13,
    "groupTraditional": "IIIA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 26.982,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p¹",
    "electronConfigShort": "[Ne] 3s² 3p¹",
    "energyLevels": [
      2,
      8,
      3
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 133,
    "covalentRadius": 123,
    "ionicRadius": "Al⁺ / Al²⁺: ~70 pm",
    "vanDerWaalsRadius": 193,
    "isotopes": [
      {
        "name": "^27Al",
        "mass": 26.982,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "2.70 g/cm³",
    "meltingPointC": 660.32,
    "boilingPointC": 2470,
    "meltingPointK": 933.47,
    "boilingPointK": 2743.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.61,
    "electronegativityAllen": 1.64,
    "electronegativityAllredRochow": 1.61,
    "ionizationEnergies": [
      577.5,
      1816.7
    ],
    "electronAffinity": 42.5,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (AlO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (AlCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Thể hiện tính chất lưỡng tính / phản ứng tan trong dung dịch kiềm giải phóng H₂."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Aluminium.",
    "flameTestColor": "Trắng bạc sáng",
    "flameTestHex": "#e2e8f0",
    "abundance": {
      "crust": "7.69 ppm",
      "ocean": "0.769 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Hans Christian Ørsted",
      "year": 1825,
      "country": "Đan Mạch",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Si",
    "atomicNumber": 14,
    "nameEn": "Silicon",
    "nameVi": "Silic",
    "nameLatin": "Silicium",
    "casNumber": "7440-21-3",
    "pubchemCid": 5461123,
    "etymology": "Đặt tên theo tiếng Latin \"Silicium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 3,
    "group": 14,
    "groupTraditional": "IVA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "metalloid",
    "subCategoryNameVi": "Á kim (Metalloid)",
    "atomicMass": 28.085,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p²",
    "electronConfigShort": "[Ne] 3s² 3p²",
    "energyLevels": [
      2,
      8,
      4
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 134,
    "covalentRadius": 124,
    "ionicRadius": "Si⁺ / Si²⁺: ~70 pm",
    "vanDerWaalsRadius": 194,
    "isotopes": [
      {
        "name": "^28Si",
        "mass": 28.085,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "2.329 g/cm³",
    "meltingPointC": 1414,
    "boilingPointC": 3265,
    "meltingPointK": 1687.15,
    "boilingPointK": 3538.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.9,
    "electronegativityAllen": 1.94,
    "electronegativityAllredRochow": 1.9,
    "ionizationEnergies": [
      786.5,
      1577.1
    ],
    "electronAffinity": 134,
    "oxidationStates": [
      -4,
      2,
      4
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (SiO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (SiCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Thể hiện tính chất lưỡng tính / phản ứng tan trong dung dịch kiềm giải phóng H₂."
    },
    "oxideHydroxideProperties": "Oxit và hydroxit lưỡng tính hoặc axit yếu.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Silicon.",
    "flameTestColor": "Không màu rõ",
    "flameTestHex": "#94a3b8",
    "abundance": {
      "crust": "7.14 ppm",
      "ocean": "0.714 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Jöns Jacob Berzelius",
      "year": 1824,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "P",
    "atomicNumber": 15,
    "nameEn": "Phosphorus",
    "nameVi": "Photpho",
    "nameLatin": "Phosphorus",
    "casNumber": "7723-14-0",
    "pubchemCid": 5462309,
    "etymology": "Đặt tên theo tiếng Latin \"Phosphorus\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 3,
    "group": 15,
    "groupTraditional": "VA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "reactive_nonmetal",
    "subCategoryNameVi": "Phi kim hoạt động",
    "atomicMass": 30.974,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p³",
    "electronConfigShort": "[Ne] 3s² 3p³",
    "energyLevels": [
      2,
      8,
      5
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 135,
    "covalentRadius": 125,
    "ionicRadius": "P⁺ / P²⁺: ~70 pm",
    "vanDerWaalsRadius": 195,
    "isotopes": [
      {
        "name": "^31P",
        "mass": 30.974,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "1.823 g/cm³",
    "meltingPointC": 44.15,
    "boilingPointC": 280.5,
    "meltingPointK": 317.3,
    "boilingPointK": 553.65,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.19,
    "electronegativityAllen": 2.23,
    "electronegativityAllredRochow": 2.19,
    "ionizationEnergies": [
      1011.8,
      1907
    ],
    "electronAffinity": 72,
    "oxidationStates": [
      -3,
      1,
      3,
      5
    ],
    "commonOxidationStates": [
      -3,
      3,
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Phosphorus.",
    "flameTestColor": "Xanh lục phát quang / Vàng cam",
    "flameTestHex": "#4ade80",
    "abundance": {
      "crust": "6.67 ppm",
      "ocean": "0.667 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Hennig Brand",
      "year": 1669,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "S",
    "atomicNumber": 16,
    "nameEn": "Sulfur",
    "nameVi": "Lưu huỳnh",
    "nameLatin": "Sulfur",
    "casNumber": "7704-34-9",
    "pubchemCid": 5362723,
    "etymology": "Đặt tên theo tiếng Latin \"Sulfur\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 3,
    "group": 16,
    "groupTraditional": "VIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "reactive_nonmetal",
    "subCategoryNameVi": "Phi kim hoạt động",
    "atomicMass": 32.06,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁴",
    "electronConfigShort": "[Ne] 3s² 3p⁴",
    "energyLevels": [
      2,
      8,
      6
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 136,
    "covalentRadius": 126,
    "ionicRadius": "S⁺ / S²⁺: ~70 pm",
    "vanDerWaalsRadius": 196,
    "isotopes": [
      {
        "name": "^32S",
        "mass": 32.06,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "2.07 g/cm³",
    "meltingPointC": 115.21,
    "boilingPointC": 444.72,
    "meltingPointK": 388.36,
    "boilingPointK": 717.87,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.58,
    "electronegativityAllen": 2.63,
    "electronegativityAllredRochow": 2.58,
    "ionizationEnergies": [
      999.6,
      2252
    ],
    "electronAffinity": 200.4,
    "oxidationStates": [
      -2,
      2,
      4,
      6
    ],
    "commonOxidationStates": [
      -2,
      4,
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (SO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (SCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Sulfur.",
    "flameTestColor": "Xanh lam huyền ảo (Blue)",
    "flameTestHex": "#3b82f6",
    "abundance": {
      "crust": "6.25 ppm",
      "ocean": "0.625 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Cổ đại / Lavoisier",
      "year": 1777,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Cl",
    "atomicNumber": 17,
    "nameEn": "Chlorine",
    "nameVi": "Clo",
    "nameLatin": "Chlorum",
    "casNumber": "7782-50-5",
    "pubchemCid": 24526,
    "etymology": "Đặt tên theo tiếng Latin \"Chlorum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 3,
    "group": 17,
    "groupTraditional": "VIIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "halogen",
    "subCategoryNameVi": "Halogen",
    "atomicMass": 35.45,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁵",
    "electronConfigShort": "[Ne] 3s² 3p⁵",
    "energyLevels": [
      2,
      8,
      7
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 137,
    "covalentRadius": 127,
    "ionicRadius": "Cl⁺ / Cl²⁺: ~70 pm",
    "vanDerWaalsRadius": 197,
    "isotopes": [
      {
        "name": "^35Cl",
        "mass": 35.45,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "3.2 g/L",
    "meltingPointC": -101.5,
    "boilingPointC": -34.04,
    "meltingPointK": 171.65,
    "boilingPointK": 239.11,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 3.16,
    "electronegativityAllen": 3.22,
    "electronegativityAllredRochow": 3.16,
    "ionizationEnergies": [
      1251.2,
      2298
    ],
    "electronAffinity": 349,
    "oxidationStates": [
      -1,
      1,
      3,
      5,
      7
    ],
    "commonOxidationStates": [
      -1,
      1,
      3,
      5,
      7
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (ClO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (ClCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Chlorine.",
    "flameTestColor": "Vàng xanh nhạt",
    "flameTestHex": "#a3e635",
    "abundance": {
      "crust": "5.88 ppm",
      "ocean": "0.588 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Carl Wilhelm Scheele",
      "year": 1774,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ar",
    "atomicNumber": 18,
    "nameEn": "Argon",
    "nameVi": "Agon",
    "nameLatin": "Argon",
    "casNumber": "7440-37-1",
    "pubchemCid": 23968,
    "etymology": "Đặt tên theo tiếng Latin \"Argon\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 3,
    "group": 18,
    "groupTraditional": "VIIIA",
    "block": "p",
    "mainCategory": "noble_gas",
    "subCategory": "noble_gas",
    "subCategoryNameVi": "Khí hiếm",
    "atomicMass": 39.948,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶",
    "electronConfigShort": "[Ne] 3s² 3p⁶",
    "energyLevels": [
      2,
      8,
      8
    ],
    "valenceElectrons": 0,
    "atomicRadiusEmpirical": 138,
    "covalentRadius": 128,
    "ionicRadius": "Ar⁺ / Ar²⁺: ~70 pm",
    "vanDerWaalsRadius": 198,
    "isotopes": [
      {
        "name": "^40Ar",
        "mass": 39.948,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "1.784 g/L",
    "meltingPointC": -189.35,
    "boilingPointC": -185.85,
    "meltingPointK": 83.8,
    "boilingPointK": 87.3,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      1520.6,
      2665.8
    ],
    "electronAffinity": 0,
    "oxidationStates": [
      0
    ],
    "commonOxidationStates": [
      0
    ],
    "reactivity": {
      "withOxygen": "Hoàn toàn trơ hóa học với oxy.",
      "withChlorine": "Không phản ứng.",
      "withHydrogen": "Không phản ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Không tác dụng.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Không tạo oxit và hydroxit bền.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Argon.",
    "flameTestColor": "Xanh tím lilac",
    "flameTestHex": "#a78bfa",
    "abundance": {
      "crust": "5.56 ppm",
      "ocean": "0.556 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Lord Rayleigh & William Ramsay",
      "year": 1894,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "K",
    "atomicNumber": 19,
    "nameEn": "Potassium",
    "nameVi": "Kali",
    "nameLatin": "Kalium",
    "casNumber": "7440-09-7",
    "pubchemCid": 5462222,
    "etymology": "Đặt tên theo tiếng Latin \"Kalium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 1,
    "groupTraditional": "IA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkali_metal",
    "subCategoryNameVi": "Kim loại kiềm",
    "atomicMass": 39.098,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
    "electronConfigShort": "[Ar] 4s¹",
    "energyLevels": [
      2,
      8,
      8,
      1
    ],
    "valenceElectrons": 1,
    "atomicRadiusEmpirical": 139,
    "covalentRadius": 129,
    "ionicRadius": "K⁺ / K²⁺: ~70 pm",
    "vanDerWaalsRadius": 199,
    "isotopes": [
      {
        "name": "^39K",
        "mass": 39.098,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "0.862 g/cm³",
    "meltingPointC": 63.5,
    "boilingPointC": 759,
    "meltingPointK": 336.65,
    "boilingPointK": 1032.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.82,
    "electronegativityAllen": 0.84,
    "electronegativityAllredRochow": 0.82,
    "ionizationEnergies": [
      418.8,
      3052
    ],
    "electronAffinity": 48.4,
    "oxidationStates": [
      1
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (KO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (KCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Phản ứng mãnh liệt tỏa nhiệt lớn sinh H₂.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Potassium.",
    "flameTestColor": "Tím hoa cà (Lilac)",
    "flameTestHex": "#c084fc",
    "abundance": {
      "crust": "5.26 ppm",
      "ocean": "0.526 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 3,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Humphry Davy",
      "year": 1807,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ca",
    "atomicNumber": 20,
    "nameEn": "Calcium",
    "nameVi": "Canxi",
    "nameLatin": "Calcium",
    "casNumber": "7440-70-2",
    "pubchemCid": 5460341,
    "etymology": "Đặt tên theo tiếng Latin \"Calcium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 2,
    "groupTraditional": "IIA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkaline_earth",
    "subCategoryNameVi": "Kim loại kiềm thổ",
    "atomicMass": 40.078,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²",
    "electronConfigShort": "[Ar] 4s²",
    "energyLevels": [
      2,
      8,
      8,
      2
    ],
    "valenceElectrons": 2,
    "atomicRadiusEmpirical": 140,
    "covalentRadius": 130,
    "ionicRadius": "Ca⁺ / Ca²⁺: ~70 pm",
    "vanDerWaalsRadius": 200,
    "isotopes": [
      {
        "name": "^40Ca",
        "mass": 40.078,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "1.54 g/cm³",
    "meltingPointC": 842,
    "boilingPointC": 1484,
    "meltingPointK": 1115.15,
    "boilingPointK": 1757.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1,
    "electronegativityAllen": 1.02,
    "electronegativityAllredRochow": 1,
    "ionizationEnergies": [
      589.8,
      1145.4
    ],
    "electronAffinity": 2.37,
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CaO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CaCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Calcium.",
    "flameTestColor": "Đỏ gạch (Brick red)",
    "flameTestHex": "#ea580c",
    "abundance": {
      "crust": "5.00 ppm",
      "ocean": "0.500 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Humphry Davy",
      "year": 1808,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Sc",
    "atomicNumber": 21,
    "nameEn": "Scandium",
    "nameVi": "Scandi",
    "nameLatin": "Scandium",
    "casNumber": "7440-20-2",
    "pubchemCid": 23953,
    "etymology": "Đặt tên theo tiếng Latin \"Scandium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 44.956,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹ 4s²",
    "electronConfigShort": "[Ar] 3d¹ 4s²",
    "energyLevels": [
      2,
      8,
      9,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 141,
    "covalentRadius": 131,
    "ionicRadius": "Sc⁺ / Sc²⁺: ~70 pm",
    "vanDerWaalsRadius": 201,
    "isotopes": [
      {
        "name": "^45Sc",
        "mass": 44.956,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "2.985 g/cm³",
    "meltingPointC": 1541,
    "boilingPointC": 2836,
    "meltingPointK": 1814.15,
    "boilingPointK": 3109.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.36,
    "electronegativityAllen": 1.39,
    "electronegativityAllredRochow": 1.36,
    "ionizationEnergies": [
      633.1,
      1235
    ],
    "electronAffinity": 18,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (ScO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (ScCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Scandium.",
    "flameTestColor": "Trắng bạc",
    "flameTestHex": "#e2e8f0",
    "abundance": {
      "crust": "4.76 ppm",
      "ocean": "0.476 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Lars Fredrik Nilson",
      "year": 1879,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ti",
    "atomicNumber": 22,
    "nameEn": "Titanium",
    "nameVi": "Titan",
    "nameLatin": "Titanium",
    "casNumber": "7440-32-6",
    "pubchemCid": 23963,
    "etymology": "Đặt tên theo tiếng Latin \"Titanium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 4,
    "groupTraditional": "IVB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 47.867,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d² 4s²",
    "electronConfigShort": "[Ar] 3d² 4s²",
    "energyLevels": [
      2,
      8,
      10,
      2
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 142,
    "covalentRadius": 132,
    "ionicRadius": "Ti⁺ / Ti²⁺: ~70 pm",
    "vanDerWaalsRadius": 202,
    "isotopes": [
      {
        "name": "^48Ti",
        "mass": 47.867,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "4.506 g/cm³",
    "meltingPointC": 1668,
    "boilingPointC": 3287,
    "meltingPointK": 1941.15,
    "boilingPointK": 3560.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.54,
    "electronegativityAllen": 1.57,
    "electronegativityAllredRochow": 1.54,
    "ionizationEnergies": [
      658.8,
      1309.8
    ],
    "electronAffinity": 7.6,
    "oxidationStates": [
      2,
      3,
      4
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (TiO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (TiCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Titanium.",
    "flameTestColor": "Tia lửa trắng chói",
    "flameTestHex": "#f8fafc",
    "abundance": {
      "crust": "4.55 ppm",
      "ocean": "0.455 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Gregor & Klaproth",
      "year": 1791,
      "country": "Anh / Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "V",
    "atomicNumber": 23,
    "nameEn": "Vanadium",
    "nameVi": "Vanadi",
    "nameLatin": "Vanadium",
    "casNumber": "7440-62-2",
    "pubchemCid": 23990,
    "etymology": "Đặt tên theo tiếng Latin \"Vanadium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 5,
    "groupTraditional": "VB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 50.942,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s²",
    "electronConfigShort": "[Ar] 3d³ 4s²",
    "energyLevels": [
      2,
      8,
      11,
      2
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 143,
    "covalentRadius": 133,
    "ionicRadius": "V⁺ / V²⁺: ~70 pm",
    "vanDerWaalsRadius": 203,
    "isotopes": [
      {
        "name": "^51V",
        "mass": 50.942,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "6.11 g/cm³",
    "meltingPointC": 1910,
    "boilingPointC": 3407,
    "meltingPointK": 2183.15,
    "boilingPointK": 3680.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.63,
    "electronegativityAllen": 1.66,
    "electronegativityAllredRochow": 1.63,
    "ionizationEnergies": [
      650.9,
      1414
    ],
    "electronAffinity": 50.6,
    "oxidationStates": [
      2,
      3,
      4,
      5
    ],
    "commonOxidationStates": [
      4,
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (VO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (VCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Vanadium.",
    "flameTestColor": "Xám ánh xanh",
    "flameTestHex": "#64748b",
    "abundance": {
      "crust": "4.35 ppm",
      "ocean": "0.435 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Nils Gabriel Sefström",
      "year": 1830,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Cr",
    "atomicNumber": 24,
    "nameEn": "Chromium",
    "nameVi": "Crom",
    "nameLatin": "Chromium",
    "casNumber": "7440-47-3",
    "pubchemCid": 23976,
    "etymology": "Đặt tên theo tiếng Latin \"Chromium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 6,
    "groupTraditional": "VIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 51.996,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹",
    "electronConfigShort": "[Ar] 3d⁵ 4s¹",
    "energyLevels": [
      2,
      8,
      13,
      1
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 144,
    "covalentRadius": 134,
    "ionicRadius": "Cr⁺ / Cr²⁺: ~70 pm",
    "vanDerWaalsRadius": 204,
    "isotopes": [
      {
        "name": "^52Cr",
        "mass": 51.996,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.19 g/cm³",
    "meltingPointC": 1907,
    "boilingPointC": 2671,
    "meltingPointK": 2180.15,
    "boilingPointK": 2944.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.66,
    "electronegativityAllen": 1.69,
    "electronegativityAllredRochow": 1.66,
    "ionizationEnergies": [
      652.9,
      1590.6
    ],
    "electronAffinity": 64.3,
    "oxidationStates": [
      2,
      3,
      6
    ],
    "commonOxidationStates": [
      3,
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CrO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CrCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Chromium.",
    "flameTestColor": "Xanh lục bạc",
    "flameTestHex": "#86efac",
    "abundance": {
      "crust": "4.17 ppm",
      "ocean": "0.417 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Louis-Nicolas Vauquelin",
      "year": 1797,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Mn",
    "atomicNumber": 25,
    "nameEn": "Manganese",
    "nameVi": "Mangan",
    "nameLatin": "Manganum",
    "casNumber": "7439-96-5",
    "pubchemCid": 23930,
    "etymology": "Đặt tên theo tiếng Latin \"Manganum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 7,
    "groupTraditional": "VIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 54.938,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s²",
    "electronConfigShort": "[Ar] 3d⁵ 4s²",
    "energyLevels": [
      2,
      8,
      13,
      2
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 145,
    "covalentRadius": 135,
    "ionicRadius": "Mn⁺ / Mn²⁺: ~70 pm",
    "vanDerWaalsRadius": 205,
    "isotopes": [
      {
        "name": "^55Mn",
        "mass": 54.938,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.21 g/cm³",
    "meltingPointC": 1246,
    "boilingPointC": 2061,
    "meltingPointK": 1519.15,
    "boilingPointK": 2334.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.55,
    "electronegativityAllen": 1.58,
    "electronegativityAllredRochow": 1.55,
    "ionizationEnergies": [
      717.3,
      1509
    ],
    "electronAffinity": 0,
    "oxidationStates": [
      2,
      3,
      4,
      6,
      7
    ],
    "commonOxidationStates": [
      2,
      4,
      7
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (MnO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (MnCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Manganese.",
    "flameTestColor": "Xanh lục vàng nhạt",
    "flameTestHex": "#bef264",
    "abundance": {
      "crust": "4.00 ppm",
      "ocean": "0.400 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Johan Gottlieb Gahn",
      "year": 1774,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Fe",
    "atomicNumber": 26,
    "nameEn": "Iron",
    "nameVi": "Sắt",
    "nameLatin": "Ferrum",
    "casNumber": "7439-89-6",
    "pubchemCid": 23925,
    "etymology": "Đặt tên theo tiếng Latin \"Ferrum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 8,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 55.845,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²",
    "electronConfigShort": "[Ar] 3d⁶ 4s²",
    "energyLevels": [
      2,
      8,
      14,
      2
    ],
    "valenceElectrons": 8,
    "atomicRadiusEmpirical": 146,
    "covalentRadius": 136,
    "ionicRadius": "Fe⁺ / Fe²⁺: ~70 pm",
    "vanDerWaalsRadius": 206,
    "isotopes": [
      {
        "name": "^56Fe",
        "mass": 55.845,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.874 g/cm³",
    "meltingPointC": 1538,
    "boilingPointC": 2862,
    "meltingPointK": 1811.15,
    "boilingPointK": 3135.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Sắt từ (Ferromagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.83,
    "electronegativityAllen": 1.87,
    "electronegativityAllredRochow": 1.83,
    "ionizationEnergies": [
      762.5,
      1561.9,
      2957
    ],
    "electronAffinity": 15.7,
    "oxidationStates": [
      2,
      3,
      6
    ],
    "commonOxidationStates": [
      2,
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (FeO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (FeCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Iron.",
    "flameTestColor": "Tia lửa vàng cam rực rỡ (Gold sparks)",
    "flameTestHex": "#f97316",
    "abundance": {
      "crust": "3.85 ppm",
      "ocean": "0.385 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Thời tiền sử",
      "year": "Cổ đại",
      "country": "Trung Đông",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Co",
    "atomicNumber": 27,
    "nameEn": "Cobalt",
    "nameVi": "Coban",
    "nameLatin": "Cobaltum",
    "casNumber": "7440-48-4",
    "pubchemCid": 104730,
    "etymology": "Đặt tên theo tiếng Latin \"Cobaltum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 9,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 58.933,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷ 4s²",
    "electronConfigShort": "[Ar] 3d⁷ 4s²",
    "energyLevels": [
      2,
      8,
      15,
      2
    ],
    "valenceElectrons": 9,
    "atomicRadiusEmpirical": 147,
    "covalentRadius": 137,
    "ionicRadius": "Co⁺ / Co²⁺: ~70 pm",
    "vanDerWaalsRadius": 207,
    "isotopes": [
      {
        "name": "^59Co",
        "mass": 58.933,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.90 g/cm³",
    "meltingPointC": 1495,
    "boilingPointC": 2927,
    "meltingPointK": 1768.15,
    "boilingPointK": 3200.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Sắt từ (Ferromagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.88,
    "electronegativityAllen": 1.92,
    "electronegativityAllredRochow": 1.88,
    "ionizationEnergies": [
      760.4,
      1648
    ],
    "electronAffinity": 63.7,
    "oxidationStates": [
      2,
      3
    ],
    "commonOxidationStates": [
      2,
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CoO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CoCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Cobalt.",
    "flameTestColor": "Không màu rõ",
    "flameTestHex": "#60a5fa",
    "abundance": {
      "crust": "3.70 ppm",
      "ocean": "0.370 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Georg Brandt",
      "year": 1735,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ni",
    "atomicNumber": 28,
    "nameEn": "Nickel",
    "nameVi": "Niken",
    "nameLatin": "Niccolum",
    "casNumber": "7440-02-0",
    "pubchemCid": 935,
    "etymology": "Đặt tên theo tiếng Latin \"Niccolum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 10,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 58.693,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸ 4s²",
    "electronConfigShort": "[Ar] 3d⁸ 4s²",
    "energyLevels": [
      2,
      8,
      16,
      2
    ],
    "valenceElectrons": 10,
    "atomicRadiusEmpirical": 148,
    "covalentRadius": 138,
    "ionicRadius": "Ni⁺ / Ni²⁺: ~70 pm",
    "vanDerWaalsRadius": 208,
    "isotopes": [
      {
        "name": "^59Ni",
        "mass": 58.693,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.908 g/cm³",
    "meltingPointC": 1455,
    "boilingPointC": 2730,
    "meltingPointK": 1728.15,
    "boilingPointK": 3003.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Sắt từ (Ferromagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.91,
    "electronegativityAllen": 1.95,
    "electronegativityAllredRochow": 1.91,
    "ionizationEnergies": [
      737.1,
      1753
    ],
    "electronAffinity": 112,
    "oxidationStates": [
      2,
      3
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (NiO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (NiCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Nickel.",
    "flameTestColor": "Không màu rõ",
    "flameTestHex": "#e2e8f0",
    "abundance": {
      "crust": "3.57 ppm",
      "ocean": "0.357 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Axel Fredrik Cronstedt",
      "year": 1751,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Cu",
    "atomicNumber": 29,
    "nameEn": "Copper",
    "nameVi": "Đồng",
    "nameLatin": "Cuprum",
    "casNumber": "7440-50-8",
    "pubchemCid": 23978,
    "etymology": "Đặt tên theo tiếng Latin \"Cuprum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 11,
    "groupTraditional": "IB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 63.546,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹",
    "electronConfigShort": "[Ar] 3d¹⁰ 4s¹",
    "energyLevels": [
      2,
      8,
      18,
      1
    ],
    "valenceElectrons": 11,
    "atomicRadiusEmpirical": 149,
    "covalentRadius": 139,
    "ionicRadius": "Cu⁺ / Cu²⁺: ~70 pm",
    "vanDerWaalsRadius": 209,
    "isotopes": [
      {
        "name": "^64Cu",
        "mass": 63.546,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.96 g/cm³",
    "meltingPointC": 1084.62,
    "boilingPointC": 2562,
    "meltingPointK": 1357.77,
    "boilingPointK": 2835.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.9,
    "electronegativityAllen": 1.94,
    "electronegativityAllredRochow": 1.9,
    "ionizationEnergies": [
      745.5,
      1957.9
    ],
    "electronAffinity": 118.4,
    "oxidationStates": [
      1,
      2,
      3
    ],
    "commonOxidationStates": [
      1,
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CuO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CuCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Copper.",
    "flameTestColor": "Xanh lục ngọc / Lục lam (Emerald)",
    "flameTestHex": "#10b981",
    "abundance": {
      "crust": "3.45 ppm",
      "ocean": "0.345 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Thời tiền sử",
      "year": "Cổ đại",
      "country": "Trung Đông",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Zn",
    "atomicNumber": 30,
    "nameEn": "Zinc",
    "nameVi": "Kẽm",
    "nameLatin": "Zincum",
    "casNumber": "7440-66-6",
    "pubchemCid": 23994,
    "etymology": "Đặt tên theo tiếng Latin \"Zincum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 12,
    "groupTraditional": "IIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 65.38,
    "electronConfigFull": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s²",
    "electronConfigShort": "[Ar] 3d¹⁰ 4s²",
    "energyLevels": [
      2,
      8,
      18,
      2
    ],
    "valenceElectrons": 12,
    "atomicRadiusEmpirical": 150,
    "covalentRadius": 140,
    "ionicRadius": "Zn⁺ / Zn²⁺: ~70 pm",
    "vanDerWaalsRadius": 210,
    "isotopes": [
      {
        "name": "^65Zn",
        "mass": 65.38,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.14 g/cm³",
    "meltingPointC": 419.53,
    "boilingPointC": 907,
    "meltingPointK": 692.68,
    "boilingPointK": 1180.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.65,
    "electronegativityAllen": 1.68,
    "electronegativityAllredRochow": 1.65,
    "ionizationEnergies": [
      906.4,
      1733.3
    ],
    "electronAffinity": -58,
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (ZnO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (ZnCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Thể hiện tính chất lưỡng tính / phản ứng tan trong dung dịch kiềm giải phóng H₂."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Zinc.",
    "flameTestColor": "Xanh lam ánh lục / Trắng xanh",
    "flameTestHex": "#67e8f9",
    "abundance": {
      "crust": "3.33 ppm",
      "ocean": "0.333 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Andreas Marggraf",
      "year": 1746,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ga",
    "atomicNumber": 31,
    "nameEn": "Gallium",
    "nameVi": "Gali",
    "nameLatin": "Gallium",
    "casNumber": "7440-55-3",
    "pubchemCid": 5462220,
    "etymology": "Đặt tên theo tiếng Latin \"Gallium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 13,
    "groupTraditional": "IIIA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 69.723,
    "electronConfigFull": "[Ar] 3d¹⁰ 4s² 4p¹",
    "electronConfigShort": "[Ar] 3d¹⁰ 4s² 4p¹",
    "energyLevels": [
      2,
      8,
      18,
      3
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 151,
    "covalentRadius": 141,
    "ionicRadius": "Ga⁺ / Ga²⁺: ~70 pm",
    "vanDerWaalsRadius": 211,
    "isotopes": [
      {
        "name": "^70Ga",
        "mass": 69.723,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "5.91 g/cm³",
    "meltingPointC": 29.76,
    "boilingPointC": 2204,
    "meltingPointK": 302.91,
    "boilingPointK": 2477.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.81,
    "electronegativityAllen": 1.85,
    "electronegativityAllredRochow": 1.81,
    "ionizationEnergies": [
      578.8,
      1979.3
    ],
    "electronAffinity": 41,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (GaO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (GaCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Gallium.",
    "flameTestColor": "Tím hoa cà đậm (Violet)",
    "flameTestHex": "#a855f7",
    "abundance": {
      "crust": "3.23 ppm",
      "ocean": "0.323 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Paul Émile Lecoq de Boisbaudran",
      "year": 1875,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ge",
    "atomicNumber": 32,
    "nameEn": "Germanium",
    "nameVi": "Gecmani",
    "nameLatin": "Germanium",
    "casNumber": "7440-56-4",
    "pubchemCid": 6327173,
    "etymology": "Đặt tên theo tiếng Latin \"Germanium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 14,
    "groupTraditional": "IVA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "metalloid",
    "subCategoryNameVi": "Á kim (Metalloid)",
    "atomicMass": 72.63,
    "electronConfigFull": "[Ar] 3d¹⁰ 4s² 4p²",
    "electronConfigShort": "[Ar] 3d¹⁰ 4s² 4p²",
    "energyLevels": [
      2,
      8,
      18,
      4
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 152,
    "covalentRadius": 142,
    "ionicRadius": "Ge⁺ / Ge²⁺: ~70 pm",
    "vanDerWaalsRadius": 212,
    "isotopes": [
      {
        "name": "^73Ge",
        "mass": 72.63,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "5.323 g/cm³",
    "meltingPointC": 938.25,
    "boilingPointC": 2833,
    "meltingPointK": 1211.4,
    "boilingPointK": 3106.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.01,
    "electronegativityAllen": 2.05,
    "electronegativityAllredRochow": 2.01,
    "ionizationEnergies": [
      762,
      1537.5
    ],
    "electronAffinity": 119,
    "oxidationStates": [
      2,
      4
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (GeO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (GeCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit và hydroxit lưỡng tính hoặc axit yếu.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Germanium.",
    "flameTestColor": "Xanh lam nhạt",
    "flameTestHex": "#60a5fa",
    "abundance": {
      "crust": "3.13 ppm",
      "ocean": "0.313 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Clemens Winkler",
      "year": 1886,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "As",
    "atomicNumber": 33,
    "nameEn": "Arsenic",
    "nameVi": "Asen",
    "nameLatin": "Arsenicum",
    "casNumber": "7440-38-2",
    "pubchemCid": 5359596,
    "etymology": "Đặt tên theo tiếng Latin \"Arsenicum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 15,
    "groupTraditional": "VA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "metalloid",
    "subCategoryNameVi": "Á kim (Metalloid)",
    "atomicMass": 74.922,
    "electronConfigFull": "[Ar] 3d¹⁰ 4s² 4p³",
    "electronConfigShort": "[Ar] 3d¹⁰ 4s² 4p³",
    "energyLevels": [
      2,
      8,
      18,
      5
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 153,
    "covalentRadius": 143,
    "ionicRadius": "As⁺ / As²⁺: ~70 pm",
    "vanDerWaalsRadius": 213,
    "isotopes": [
      {
        "name": "^75As",
        "mass": 74.922,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "5.727 g/cm³",
    "meltingPointC": 817,
    "boilingPointC": 614,
    "meltingPointK": 1090.15,
    "boilingPointK": 887.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.18,
    "electronegativityAllen": 2.22,
    "electronegativityAllredRochow": 2.18,
    "ionizationEnergies": [
      947,
      1798
    ],
    "electronAffinity": 78,
    "oxidationStates": [
      -3,
      3,
      5
    ],
    "commonOxidationStates": [
      3,
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (AsO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (AsCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit và hydroxit lưỡng tính hoặc axit yếu.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Arsenic.",
    "flameTestColor": "Xanh lam nhạt khói trắng mùi tỏi",
    "flameTestHex": "#38bdf8",
    "abundance": {
      "crust": "3.03 ppm",
      "ocean": "0.303 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Albertus Magnus",
      "year": 1250,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Se",
    "atomicNumber": 34,
    "nameEn": "Selenium",
    "nameVi": "Selen",
    "nameLatin": "Selenium",
    "casNumber": "7782-49-2",
    "pubchemCid": 24263,
    "etymology": "Đặt tên theo tiếng Latin \"Selenium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 16,
    "groupTraditional": "VIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "reactive_nonmetal",
    "subCategoryNameVi": "Phi kim hoạt động",
    "atomicMass": 78.971,
    "electronConfigFull": "[Ar] 3d¹⁰ 4s² 4p⁴",
    "electronConfigShort": "[Ar] 3d¹⁰ 4s² 4p⁴",
    "energyLevels": [
      2,
      8,
      18,
      6
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 154,
    "covalentRadius": 144,
    "ionicRadius": "Se⁺ / Se²⁺: ~70 pm",
    "vanDerWaalsRadius": 214,
    "isotopes": [
      {
        "name": "^79Se",
        "mass": 78.971,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "4.81 g/cm³",
    "meltingPointC": 221,
    "boilingPointC": 685,
    "meltingPointK": 494.15,
    "boilingPointK": 958.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.55,
    "electronegativityAllen": 2.6,
    "electronegativityAllredRochow": 2.55,
    "ionizationEnergies": [
      941,
      2045
    ],
    "electronAffinity": 195,
    "oxidationStates": [
      -2,
      2,
      4,
      6
    ],
    "commonOxidationStates": [
      -2,
      4,
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (SeO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (SeCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Selenium.",
    "flameTestColor": "Xanh lam sáng (Azure blue)",
    "flameTestHex": "#2563eb",
    "abundance": {
      "crust": "2.94 ppm",
      "ocean": "0.294 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Jöns Jacob Berzelius",
      "year": 1817,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Br",
    "atomicNumber": 35,
    "nameEn": "Bromine",
    "nameVi": "Brom",
    "nameLatin": "Bromum",
    "casNumber": "7726-95-6",
    "pubchemCid": 24408,
    "etymology": "Đặt tên theo tiếng Latin \"Bromum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 17,
    "groupTraditional": "VIIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "halogen",
    "subCategoryNameVi": "Halogen",
    "atomicMass": 79.904,
    "electronConfigFull": "[Ar] 3d¹⁰ 4s² 4p⁵",
    "electronConfigShort": "[Ar] 3d¹⁰ 4s² 4p⁵",
    "energyLevels": [
      2,
      8,
      18,
      7
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 155,
    "covalentRadius": 145,
    "ionicRadius": "Br⁺ / Br²⁺: ~70 pm",
    "vanDerWaalsRadius": 215,
    "isotopes": [
      {
        "name": "^80Br",
        "mass": 79.904,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "liquid",
    "appearance": "Đơn chất phi kim, trạng thái liquid",
    "density": "3.1028 g/cm³",
    "meltingPointC": -7.2,
    "boilingPointC": 58.8,
    "meltingPointK": 265.95,
    "boilingPointK": 331.95,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.96,
    "electronegativityAllen": 3.02,
    "electronegativityAllredRochow": 2.96,
    "ionizationEnergies": [
      1139.9,
      2103
    ],
    "electronAffinity": 324.6,
    "oxidationStates": [
      -1,
      1,
      3,
      5,
      7
    ],
    "commonOxidationStates": [
      -1,
      1,
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (BrO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (BrCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Bromine.",
    "flameTestColor": "Không màu / Đỏ nâu khói",
    "flameTestHex": "#b91c1c",
    "abundance": {
      "crust": "2.86 ppm",
      "ocean": "0.286 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Antoine Jérôme Balard",
      "year": 1826,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Kr",
    "atomicNumber": 36,
    "nameEn": "Krypton",
    "nameVi": "Kripton",
    "nameLatin": "Krypton",
    "casNumber": "7439-90-9",
    "pubchemCid": 23926,
    "etymology": "Đặt tên theo tiếng Latin \"Krypton\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 4,
    "group": 18,
    "groupTraditional": "VIIIA",
    "block": "p",
    "mainCategory": "noble_gas",
    "subCategory": "noble_gas",
    "subCategoryNameVi": "Khí hiếm",
    "atomicMass": 83.798,
    "electronConfigFull": "[Ar] 3d¹⁰ 4s² 4p⁶",
    "electronConfigShort": "[Ar] 3d¹⁰ 4s² 4p⁶",
    "energyLevels": [
      2,
      8,
      18,
      8
    ],
    "valenceElectrons": 0,
    "atomicRadiusEmpirical": 156,
    "covalentRadius": 146,
    "ionicRadius": "Kr⁺ / Kr²⁺: ~70 pm",
    "vanDerWaalsRadius": 216,
    "isotopes": [
      {
        "name": "^84Kr",
        "mass": 83.798,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "3.749 g/L",
    "meltingPointC": -157.36,
    "boilingPointC": -153.22,
    "meltingPointK": 115.79,
    "boilingPointK": 119.93,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 3,
    "electronegativityAllen": 3.06,
    "electronegativityAllredRochow": 3,
    "ionizationEnergies": [
      1350.8,
      2350.4
    ],
    "electronAffinity": 0,
    "oxidationStates": [
      0,
      2
    ],
    "commonOxidationStates": [
      0
    ],
    "reactivity": {
      "withOxygen": "Hoàn toàn trơ hóa học với oxy.",
      "withChlorine": "Không phản ứng.",
      "withHydrogen": "Không phản ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Không tác dụng.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Không tạo oxit và hydroxit bền.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Krypton.",
    "flameTestColor": "Trắng xanh băng / Trắng xám",
    "flameTestHex": "#a5f3fc",
    "abundance": {
      "crust": "2.78 ppm",
      "ocean": "0.278 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Ramsay & Travers",
      "year": 1898,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Rb",
    "atomicNumber": 37,
    "nameEn": "Rubidium",
    "nameVi": "Rubiđi",
    "nameLatin": "Rubidium",
    "casNumber": "7440-17-7",
    "pubchemCid": 5357696,
    "etymology": "Đặt tên theo tiếng Latin \"Rubidium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 1,
    "groupTraditional": "IA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkali_metal",
    "subCategoryNameVi": "Kim loại kiềm",
    "atomicMass": 85.468,
    "electronConfigFull": "[Kr] 5s¹",
    "electronConfigShort": "[Kr] 5s¹",
    "energyLevels": [
      2,
      8,
      18,
      8,
      1
    ],
    "valenceElectrons": 1,
    "atomicRadiusEmpirical": 157,
    "covalentRadius": 147,
    "ionicRadius": "Rb⁺ / Rb²⁺: ~70 pm",
    "vanDerWaalsRadius": 217,
    "isotopes": [
      {
        "name": "^85Rb",
        "mass": 85.468,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "1.532 g/cm³",
    "meltingPointC": 39.3,
    "boilingPointC": 688,
    "meltingPointK": 312.45,
    "boilingPointK": 961.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.82,
    "electronegativityAllen": 0.84,
    "electronegativityAllredRochow": 0.82,
    "ionizationEnergies": [
      403,
      2633
    ],
    "electronAffinity": 46.9,
    "oxidationStates": [
      1
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (RbO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (RbCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Phản ứng mãnh liệt tỏa nhiệt lớn sinh H₂.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Rubidium.",
    "flameTestColor": "Đỏ tím sẫm (Red-violet)",
    "flameTestHex": "#c026d3",
    "abundance": {
      "crust": "2.70 ppm",
      "ocean": "0.270 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 3,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Bunsen & Kirchhoff",
      "year": 1861,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Sr",
    "atomicNumber": 38,
    "nameEn": "Strontium",
    "nameVi": "Stronti",
    "nameLatin": "Strontium",
    "casNumber": "7440-24-6",
    "pubchemCid": 5359327,
    "etymology": "Đặt tên theo tiếng Latin \"Strontium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 2,
    "groupTraditional": "IIA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkaline_earth",
    "subCategoryNameVi": "Kim loại kiềm thổ",
    "atomicMass": 87.62,
    "electronConfigFull": "[Kr] 5s²",
    "electronConfigShort": "[Kr] 5s²",
    "energyLevels": [
      2,
      8,
      18,
      8,
      2
    ],
    "valenceElectrons": 2,
    "atomicRadiusEmpirical": 158,
    "covalentRadius": 148,
    "ionicRadius": "Sr⁺ / Sr²⁺: ~70 pm",
    "vanDerWaalsRadius": 218,
    "isotopes": [
      {
        "name": "^88Sr",
        "mass": 87.62,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "2.64 g/cm³",
    "meltingPointC": 777,
    "boilingPointC": 1382,
    "meltingPointK": 1050.15,
    "boilingPointK": 1655.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.95,
    "electronegativityAllen": 0.97,
    "electronegativityAllredRochow": 0.95,
    "ionizationEnergies": [
      549.5,
      1064.2
    ],
    "electronAffinity": 5,
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (SrO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (SrCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Strontium.",
    "flameTestColor": "Đỏ tươi rực rỡ pháo hoa (Crimson red)",
    "flameTestHex": "#ef4444",
    "abundance": {
      "crust": "2.63 ppm",
      "ocean": "0.263 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Adair Crawford & Davy",
      "year": 1790,
      "country": "Scotland / Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Y",
    "atomicNumber": 39,
    "nameEn": "Yttrium",
    "nameVi": "Ytri",
    "nameLatin": "Yttrium",
    "casNumber": "7440-65-5",
    "pubchemCid": 23993,
    "etymology": "Đặt tên theo tiếng Latin \"Yttrium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 88.906,
    "electronConfigFull": "[Kr] 4d¹ 5s²",
    "electronConfigShort": "[Kr] 4d¹ 5s²",
    "energyLevels": [
      2,
      8,
      18,
      9,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 159,
    "covalentRadius": 149,
    "ionicRadius": "Y⁺ / Y²⁺: ~70 pm",
    "vanDerWaalsRadius": 219,
    "isotopes": [
      {
        "name": "^89Y",
        "mass": 88.906,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "4.472 g/cm³",
    "meltingPointC": 1526,
    "boilingPointC": 3345,
    "meltingPointK": 1799.15,
    "boilingPointK": 3618.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.22,
    "electronegativityAllen": 1.24,
    "electronegativityAllredRochow": 1.22,
    "ionizationEnergies": [
      600,
      1180
    ],
    "electronAffinity": 29.6,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (YO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (YCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Yttrium.",
    "flameTestColor": "Đỏ tươi sẫm",
    "flameTestHex": "#dc2626",
    "abundance": {
      "crust": "2.56 ppm",
      "ocean": "0.256 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Johan Gadolin",
      "year": 1794,
      "country": "Phần Lan",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Zr",
    "atomicNumber": 40,
    "nameEn": "Zirconium",
    "nameVi": "Ziriconi",
    "nameLatin": "Zirconium",
    "casNumber": "7440-67-7",
    "pubchemCid": 23995,
    "etymology": "Đặt tên theo tiếng Latin \"Zirconium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 4,
    "groupTraditional": "IVB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 91.224,
    "electronConfigFull": "[Kr] 4d² 5s²",
    "electronConfigShort": "[Kr] 4d² 5s²",
    "energyLevels": [
      2,
      8,
      18,
      10,
      2
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 160,
    "covalentRadius": 110,
    "ionicRadius": "Zr⁺ / Zr²⁺: ~70 pm",
    "vanDerWaalsRadius": 180,
    "isotopes": [
      {
        "name": "^91Zr",
        "mass": 91.224,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "6.52 g/cm³",
    "meltingPointC": 1855,
    "boilingPointC": 4409,
    "meltingPointK": 2128.15,
    "boilingPointK": 4682.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.33,
    "electronegativityAllen": 1.36,
    "electronegativityAllredRochow": 1.33,
    "ionizationEnergies": [
      640.1,
      1270
    ],
    "electronAffinity": 41.1,
    "oxidationStates": [
      4
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (ZrO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (ZrCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Zirconium.",
    "flameTestColor": "Trắng sáng",
    "flameTestHex": "#f1f5f9",
    "abundance": {
      "crust": "2.50 ppm",
      "ocean": "0.250 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Martin Heinrich Klaproth",
      "year": 1789,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Nb",
    "atomicNumber": 41,
    "nameEn": "Niobium",
    "nameVi": "Niobi",
    "nameLatin": "Niobium",
    "casNumber": "7440-03-1",
    "pubchemCid": 23936,
    "etymology": "Đặt tên theo tiếng Latin \"Niobium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 5,
    "groupTraditional": "VB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 92.906,
    "electronConfigFull": "[Kr] 4d⁴ 5s¹",
    "electronConfigShort": "[Kr] 4d⁴ 5s¹",
    "energyLevels": [
      2,
      8,
      18,
      12,
      1
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 161,
    "covalentRadius": 111,
    "ionicRadius": "Nb⁺ / Nb²⁺: ~70 pm",
    "vanDerWaalsRadius": 181,
    "isotopes": [
      {
        "name": "^93Nb",
        "mass": 92.906,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.57 g/cm³",
    "meltingPointC": 2477,
    "boilingPointC": 4744,
    "meltingPointK": 2750.15,
    "boilingPointK": 5017.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.6,
    "electronegativityAllen": 1.63,
    "electronegativityAllredRochow": 1.6,
    "ionizationEnergies": [
      652.1,
      1380
    ],
    "electronAffinity": 86.1,
    "oxidationStates": [
      3,
      5
    ],
    "commonOxidationStates": [
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (NbO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (NbCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Niobium.",
    "flameTestColor": "Xám bạc",
    "flameTestHex": "#94a3b8",
    "abundance": {
      "crust": "2.44 ppm",
      "ocean": "0.244 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Charles Hatchett",
      "year": 1801,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Mo",
    "atomicNumber": 42,
    "nameEn": "Molybdenum",
    "nameVi": "Molipđen",
    "nameLatin": "Molybdaenum",
    "casNumber": "7439-98-7",
    "pubchemCid": 23932,
    "etymology": "Đặt tên theo tiếng Latin \"Molybdaenum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 6,
    "groupTraditional": "VIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 95.95,
    "electronConfigFull": "[Kr] 4d⁵ 5s¹",
    "electronConfigShort": "[Kr] 4d⁵ 5s¹",
    "energyLevels": [
      2,
      8,
      18,
      13,
      1
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 162,
    "covalentRadius": 112,
    "ionicRadius": "Mo⁺ / Mo²⁺: ~70 pm",
    "vanDerWaalsRadius": 182,
    "isotopes": [
      {
        "name": "^96Mo",
        "mass": 95.95,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "10.28 g/cm³",
    "meltingPointC": 2623,
    "boilingPointC": 4639,
    "meltingPointK": 2896.15,
    "boilingPointK": 4912.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.16,
    "electronegativityAllen": 2.2,
    "electronegativityAllredRochow": 2.16,
    "ionizationEnergies": [
      684.3,
      1560
    ],
    "electronAffinity": 71.9,
    "oxidationStates": [
      2,
      3,
      4,
      5,
      6
    ],
    "commonOxidationStates": [
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (MoO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (MoCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Molybdenum.",
    "flameTestColor": "Xanh lục vàng nhạt",
    "flameTestHex": "#d9f99d",
    "abundance": {
      "crust": "2.38 ppm",
      "ocean": "0.238 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Scheele & Hjelm",
      "year": 1778,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Tc",
    "atomicNumber": 43,
    "nameEn": "Technetium",
    "nameVi": "Tecnexit",
    "nameLatin": "Technetium",
    "casNumber": "7440-26-8",
    "pubchemCid": 23956,
    "etymology": "Đặt tên theo tiếng Latin \"Technetium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 7,
    "groupTraditional": "VIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 98,
    "electronConfigFull": "[Kr] 4d⁵ 5s²",
    "electronConfigShort": "[Kr] 4d⁵ 5s²",
    "energyLevels": [
      2,
      8,
      18,
      13,
      2
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 163,
    "covalentRadius": 113,
    "ionicRadius": "Tc⁺ / Tc²⁺: ~70 pm",
    "vanDerWaalsRadius": 183,
    "isotopes": [
      {
        "name": "^98Tc",
        "mass": 98,
        "abundance": "Phổ biến nhất",
        "isStable": false
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "11.0 g/cm³",
    "meltingPointC": 2157,
    "boilingPointC": 4265,
    "meltingPointK": 2430.15,
    "boilingPointK": 4538.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.9,
    "electronegativityAllen": 1.94,
    "electronegativityAllredRochow": 1.9,
    "ionizationEnergies": [
      702,
      1470
    ],
    "electronAffinity": 53,
    "oxidationStates": [
      4,
      7
    ],
    "commonOxidationStates": [
      7
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (TcO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (TcCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Technetium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "2.33 ppm",
      "ocean": "0.233 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Carlo Perrier & Emilio Segrè",
      "year": 1937,
      "country": "Ý",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ru",
    "atomicNumber": 44,
    "nameEn": "Ruthenium",
    "nameVi": "Ruteni",
    "nameLatin": "Ruthenium",
    "casNumber": "7440-18-8",
    "pubchemCid": 23951,
    "etymology": "Đặt tên theo tiếng Latin \"Ruthenium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 8,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 101.07,
    "electronConfigFull": "[Kr] 4d⁷ 5s¹",
    "electronConfigShort": "[Kr] 4d⁷ 5s¹",
    "energyLevels": [
      2,
      8,
      18,
      15,
      1
    ],
    "valenceElectrons": 8,
    "atomicRadiusEmpirical": 164,
    "covalentRadius": 114,
    "ionicRadius": "Ru⁺ / Ru²⁺: ~70 pm",
    "vanDerWaalsRadius": 184,
    "isotopes": [
      {
        "name": "^101Ru",
        "mass": 101.07,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "12.45 g/cm³",
    "meltingPointC": 2334,
    "boilingPointC": 4150,
    "meltingPointK": 2607.15,
    "boilingPointK": 4423.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.2,
    "electronegativityAllen": 2.24,
    "electronegativityAllredRochow": 2.2,
    "ionizationEnergies": [
      710.2,
      1620
    ],
    "electronAffinity": 101.3,
    "oxidationStates": [
      2,
      3,
      4,
      8
    ],
    "commonOxidationStates": [
      3,
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (RuO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (RuCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Ruthenium.",
    "flameTestColor": "Không màu",
    "flameTestHex": "#94a3b8",
    "abundance": {
      "crust": "2.27 ppm",
      "ocean": "0.227 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Karl Ernst Claus",
      "year": 1844,
      "country": "Nga",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Rh",
    "atomicNumber": 45,
    "nameEn": "Rhodium",
    "nameVi": "Rodi",
    "nameLatin": "Rhodium",
    "casNumber": "7440-16-6",
    "pubchemCid": 23949,
    "etymology": "Đặt tên theo tiếng Latin \"Rhodium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 9,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 102.91,
    "electronConfigFull": "[Kr] 4d⁸ 5s¹",
    "electronConfigShort": "[Kr] 4d⁸ 5s¹",
    "energyLevels": [
      2,
      8,
      18,
      16,
      1
    ],
    "valenceElectrons": 9,
    "atomicRadiusEmpirical": 165,
    "covalentRadius": 115,
    "ionicRadius": "Rh⁺ / Rh²⁺: ~70 pm",
    "vanDerWaalsRadius": 185,
    "isotopes": [
      {
        "name": "^103Rh",
        "mass": 102.91,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "12.41 g/cm³",
    "meltingPointC": 1964,
    "boilingPointC": 3695,
    "meltingPointK": 2237.15,
    "boilingPointK": 3968.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.28,
    "electronegativityAllen": 2.33,
    "electronegativityAllredRochow": 2.28,
    "ionizationEnergies": [
      719.7,
      1740
    ],
    "electronAffinity": 109.7,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (RhO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (RhCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Rhodium.",
    "flameTestColor": "Không màu",
    "flameTestHex": "#f1f5f9",
    "abundance": {
      "crust": "2.22 ppm",
      "ocean": "0.222 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "William Hyde Wollaston",
      "year": 1804,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Pd",
    "atomicNumber": 46,
    "nameEn": "Palladium",
    "nameVi": "Palađi",
    "nameLatin": "Palladium",
    "casNumber": "7440-05-3",
    "pubchemCid": 23938,
    "etymology": "Đặt tên theo tiếng Latin \"Palladium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 10,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 106.42,
    "electronConfigFull": "[Kr] 4d¹⁰",
    "electronConfigShort": "[Kr] 4d¹⁰",
    "energyLevels": [
      2,
      8,
      18,
      18
    ],
    "valenceElectrons": 10,
    "atomicRadiusEmpirical": 166,
    "covalentRadius": 116,
    "ionicRadius": "Pd⁺ / Pd²⁺: ~70 pm",
    "vanDerWaalsRadius": 186,
    "isotopes": [
      {
        "name": "^106Pd",
        "mass": 106.42,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "12.023 g/cm³",
    "meltingPointC": 1554.9,
    "boilingPointC": 2963,
    "meltingPointK": 1828.05,
    "boilingPointK": 3236.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.2,
    "electronegativityAllen": 2.24,
    "electronegativityAllredRochow": 2.2,
    "ionizationEnergies": [
      804.4,
      1870
    ],
    "electronAffinity": 53.7,
    "oxidationStates": [
      2,
      4
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PdO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PdCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Palladium.",
    "flameTestColor": "Không màu",
    "flameTestHex": "#e2e8f0",
    "abundance": {
      "crust": "2.17 ppm",
      "ocean": "0.217 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "William Hyde Wollaston",
      "year": 1802,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ag",
    "atomicNumber": 47,
    "nameEn": "Silver",
    "nameVi": "Bạc",
    "nameLatin": "Argentum",
    "casNumber": "7440-22-4",
    "pubchemCid": 23954,
    "etymology": "Đặt tên theo tiếng Latin \"Argentum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 11,
    "groupTraditional": "IB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 107.87,
    "electronConfigFull": "[Kr] 4d¹⁰ 5s¹",
    "electronConfigShort": "[Kr] 4d¹⁰ 5s¹",
    "energyLevels": [
      2,
      8,
      18,
      18,
      1
    ],
    "valenceElectrons": 11,
    "atomicRadiusEmpirical": 167,
    "covalentRadius": 117,
    "ionicRadius": "Ag⁺ / Ag²⁺: ~70 pm",
    "vanDerWaalsRadius": 187,
    "isotopes": [
      {
        "name": "^108Ag",
        "mass": 107.87,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "10.49 g/cm³",
    "meltingPointC": 961.78,
    "boilingPointC": 2162,
    "meltingPointK": 1234.93,
    "boilingPointK": 2435.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.93,
    "electronegativityAllen": 1.97,
    "electronegativityAllredRochow": 1.93,
    "ionizationEnergies": [
      731,
      2070
    ],
    "electronAffinity": 125.6,
    "oxidationStates": [
      1
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (AgO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (AgCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Silver.",
    "flameTestColor": "Xanh lục nhạt",
    "flameTestHex": "#86efac",
    "abundance": {
      "crust": "2.13 ppm",
      "ocean": "0.213 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Cổ đại",
      "year": "Cổ đại",
      "country": "Toàn cầu",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Cd",
    "atomicNumber": 48,
    "nameEn": "Cadmium",
    "nameVi": "Cadimi",
    "nameLatin": "Cadmium",
    "casNumber": "7440-43-9",
    "pubchemCid": 23973,
    "etymology": "Đặt tên theo tiếng Latin \"Cadmium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 12,
    "groupTraditional": "IIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 112.41,
    "electronConfigFull": "[Kr] 4d¹⁰ 5s²",
    "electronConfigShort": "[Kr] 4d¹⁰ 5s²",
    "energyLevels": [
      2,
      8,
      18,
      18,
      2
    ],
    "valenceElectrons": 12,
    "atomicRadiusEmpirical": 168,
    "covalentRadius": 118,
    "ionicRadius": "Cd⁺ / Cd²⁺: ~70 pm",
    "vanDerWaalsRadius": 188,
    "isotopes": [
      {
        "name": "^112Cd",
        "mass": 112.41,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.65 g/cm³",
    "meltingPointC": 321.07,
    "boilingPointC": 767,
    "meltingPointK": 594.22,
    "boilingPointK": 1040.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.69,
    "electronegativityAllen": 1.72,
    "electronegativityAllredRochow": 1.69,
    "ionizationEnergies": [
      867.8,
      1631.4
    ],
    "electronAffinity": -68,
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CdO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CdCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Cadmium.",
    "flameTestColor": "Xanh lam ánh đỏ",
    "flameTestHex": "#60a5fa",
    "abundance": {
      "crust": "2.08 ppm",
      "ocean": "0.208 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Hermann & Stromeyer",
      "year": 1817,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "In",
    "atomicNumber": 49,
    "nameEn": "Indium",
    "nameVi": "Inđi",
    "nameLatin": "Indium",
    "casNumber": "7440-74-6",
    "pubchemCid": 5359967,
    "etymology": "Đặt tên theo tiếng Latin \"Indium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 13,
    "groupTraditional": "IIIA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 114.82,
    "electronConfigFull": "[Kr] 4d¹⁰ 5s² 5p¹",
    "electronConfigShort": "[Kr] 4d¹⁰ 5s² 5p¹",
    "energyLevels": [
      2,
      8,
      18,
      18,
      3
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 169,
    "covalentRadius": 119,
    "ionicRadius": "In⁺ / In²⁺: ~70 pm",
    "vanDerWaalsRadius": 189,
    "isotopes": [
      {
        "name": "^115In",
        "mass": 114.82,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.31 g/cm³",
    "meltingPointC": 156.6,
    "boilingPointC": 2072,
    "meltingPointK": 429.75,
    "boilingPointK": 2345.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.78,
    "electronegativityAllen": 1.82,
    "electronegativityAllredRochow": 1.78,
    "ionizationEnergies": [
      558.3,
      1820.7
    ],
    "electronAffinity": 38.9,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (InO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (InCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Indium.",
    "flameTestColor": "Xanh chàm rực rỡ (Indigo)",
    "flameTestHex": "#4f46e5",
    "abundance": {
      "crust": "2.04 ppm",
      "ocean": "0.204 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Reich & Richter",
      "year": 1863,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Sn",
    "atomicNumber": 50,
    "nameEn": "Tin",
    "nameVi": "Thiếc",
    "nameLatin": "Stannum",
    "casNumber": "7440-31-5",
    "pubchemCid": 5352426,
    "etymology": "Đặt tên theo tiếng Latin \"Stannum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 14,
    "groupTraditional": "IVA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 118.71,
    "electronConfigFull": "[Kr] 4d¹⁰ 5s² 5p²",
    "electronConfigShort": "[Kr] 4d¹⁰ 5s² 5p²",
    "energyLevels": [
      2,
      8,
      18,
      18,
      4
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 120,
    "covalentRadius": 120,
    "ionicRadius": "Sn⁺ / Sn²⁺: ~70 pm",
    "vanDerWaalsRadius": 190,
    "isotopes": [
      {
        "name": "^119Sn",
        "mass": 118.71,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.31 g/cm³",
    "meltingPointC": 231.93,
    "boilingPointC": 2602,
    "meltingPointK": 505.08,
    "boilingPointK": 2875.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.96,
    "electronegativityAllen": 2,
    "electronegativityAllredRochow": 1.96,
    "ionizationEnergies": [
      708.6,
      1411.8
    ],
    "electronAffinity": 107.3,
    "oxidationStates": [
      2,
      4
    ],
    "commonOxidationStates": [
      2,
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (SnO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (SnCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Tin.",
    "flameTestColor": "Xanh lam nhạt",
    "flameTestHex": "#93c5fd",
    "abundance": {
      "crust": "2.00 ppm",
      "ocean": "0.200 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Cổ đại (~3000 TCN)",
      "year": "Cổ đại",
      "country": "Cận Đông",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Sb",
    "atomicNumber": 51,
    "nameEn": "Antimony",
    "nameVi": "Antimon",
    "nameLatin": "Stibium",
    "casNumber": "7440-36-0",
    "pubchemCid": 5354495,
    "etymology": "Đặt tên theo tiếng Latin \"Stibium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 15,
    "groupTraditional": "VA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "metalloid",
    "subCategoryNameVi": "Á kim (Metalloid)",
    "atomicMass": 121.76,
    "electronConfigFull": "[Kr] 4d¹⁰ 5s² 5p³",
    "electronConfigShort": "[Kr] 4d¹⁰ 5s² 5p³",
    "energyLevels": [
      2,
      8,
      18,
      18,
      5
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 121,
    "covalentRadius": 121,
    "ionicRadius": "Sb⁺ / Sb²⁺: ~70 pm",
    "vanDerWaalsRadius": 191,
    "isotopes": [
      {
        "name": "^122Sb",
        "mass": 121.76,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "6.697 g/cm³",
    "meltingPointC": 630.63,
    "boilingPointC": 1587,
    "meltingPointK": 903.78,
    "boilingPointK": 1860.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.05,
    "electronegativityAllen": 2.09,
    "electronegativityAllredRochow": 2.05,
    "ionizationEnergies": [
      834,
      1594.9
    ],
    "electronAffinity": 103.2,
    "oxidationStates": [
      -3,
      3,
      5
    ],
    "commonOxidationStates": [
      3,
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (SbO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (SbCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit và hydroxit lưỡng tính hoặc axit yếu.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Antimony.",
    "flameTestColor": "Xanh lục nhạt",
    "flameTestHex": "#86efac",
    "abundance": {
      "crust": "1.96 ppm",
      "ocean": "0.196 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Cổ đại",
      "year": "Cổ đại",
      "country": "Ai Cập",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Te",
    "atomicNumber": 52,
    "nameEn": "Tellurium",
    "nameVi": "Telu",
    "nameLatin": "Tellurium",
    "casNumber": "13494-80-9",
    "pubchemCid": 6327182,
    "etymology": "Đặt tên theo tiếng Latin \"Tellurium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 16,
    "groupTraditional": "VIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "metalloid",
    "subCategoryNameVi": "Á kim (Metalloid)",
    "atomicMass": 127.6,
    "electronConfigFull": "[Kr] 4d¹⁰ 5s² 5p⁴",
    "electronConfigShort": "[Kr] 4d¹⁰ 5s² 5p⁴",
    "energyLevels": [
      2,
      8,
      18,
      18,
      6
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 122,
    "covalentRadius": 122,
    "ionicRadius": "Te⁺ / Te²⁺: ~70 pm",
    "vanDerWaalsRadius": 192,
    "isotopes": [
      {
        "name": "^128Te",
        "mass": 127.6,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "6.24 g/cm³",
    "meltingPointC": 449.51,
    "boilingPointC": 988,
    "meltingPointK": 722.66,
    "boilingPointK": 1261.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.1,
    "electronegativityAllen": 2.14,
    "electronegativityAllredRochow": 2.1,
    "ionizationEnergies": [
      869.3,
      1790
    ],
    "electronAffinity": 190.2,
    "oxidationStates": [
      -2,
      2,
      4,
      6
    ],
    "commonOxidationStates": [
      -2,
      4,
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (TeO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (TeCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit và hydroxit lưỡng tính hoặc axit yếu.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Tellurium.",
    "flameTestColor": "Xanh lục sáng (Pale green)",
    "flameTestHex": "#22c55e",
    "abundance": {
      "crust": "1.92 ppm",
      "ocean": "0.192 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "von Reichenstein",
      "year": 1782,
      "country": "Romania",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "I",
    "atomicNumber": 53,
    "nameEn": "Iodine",
    "nameVi": "Iot",
    "nameLatin": "Iodum",
    "casNumber": "7553-56-2",
    "pubchemCid": 807,
    "etymology": "Đặt tên theo tiếng Latin \"Iodum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 17,
    "groupTraditional": "VIIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "halogen",
    "subCategoryNameVi": "Halogen",
    "atomicMass": 126.9,
    "electronConfigFull": "[Kr] 4d¹⁰ 5s² 5p⁵",
    "electronConfigShort": "[Kr] 4d¹⁰ 5s² 5p⁵",
    "energyLevels": [
      2,
      8,
      18,
      18,
      7
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 123,
    "covalentRadius": 123,
    "ionicRadius": "I⁺ / I²⁺: ~70 pm",
    "vanDerWaalsRadius": 193,
    "isotopes": [
      {
        "name": "^127I",
        "mass": 126.9,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "4.933 g/cm³",
    "meltingPointC": 113.7,
    "boilingPointC": 184.3,
    "meltingPointK": 386.85,
    "boilingPointK": 457.45,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.66,
    "electronegativityAllen": 2.71,
    "electronegativityAllredRochow": 2.66,
    "ionizationEnergies": [
      1008.4,
      1845.9
    ],
    "electronAffinity": 295.2,
    "oxidationStates": [
      -1,
      1,
      3,
      5,
      7
    ],
    "commonOxidationStates": [
      -1,
      1,
      5,
      7
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (IO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (ICl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Iodine.",
    "flameTestColor": "Hơi tím thăng hoa đặc trưng (Violet vapor)",
    "flameTestHex": "#a855f7",
    "abundance": {
      "crust": "1.89 ppm",
      "ocean": "0.189 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Bernard Courtois",
      "year": 1811,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Xe",
    "atomicNumber": 54,
    "nameEn": "Xenon",
    "nameVi": "Xenon",
    "nameLatin": "Xenon",
    "casNumber": "7440-63-3",
    "pubchemCid": 23991,
    "etymology": "Đặt tên theo tiếng Latin \"Xenon\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 5,
    "group": 18,
    "groupTraditional": "VIIIA",
    "block": "p",
    "mainCategory": "noble_gas",
    "subCategory": "noble_gas",
    "subCategoryNameVi": "Khí hiếm",
    "atomicMass": 131.29,
    "electronConfigFull": "[Kr] 4d¹⁰ 5s² 5p⁶",
    "electronConfigShort": "[Kr] 4d¹⁰ 5s² 5p⁶",
    "energyLevels": [
      2,
      8,
      18,
      18,
      8
    ],
    "valenceElectrons": 0,
    "atomicRadiusEmpirical": 124,
    "covalentRadius": 124,
    "ionicRadius": "Xe⁺ / Xe²⁺: ~70 pm",
    "vanDerWaalsRadius": 194,
    "isotopes": [
      {
        "name": "^131Xe",
        "mass": 131.29,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "5.894 g/L",
    "meltingPointC": -111.75,
    "boilingPointC": -108.09,
    "meltingPointK": 161.4,
    "boilingPointK": 165.06,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.6,
    "electronegativityAllen": 2.65,
    "electronegativityAllredRochow": 2.6,
    "ionizationEnergies": [
      1170.4,
      2046.4
    ],
    "electronAffinity": 0,
    "oxidationStates": [
      0,
      2,
      4,
      6,
      8
    ],
    "commonOxidationStates": [
      0,
      2,
      4,
      6
    ],
    "reactivity": {
      "withOxygen": "Hoàn toàn trơ hóa học với oxy.",
      "withChlorine": "Không phản ứng.",
      "withHydrogen": "Không phản ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Không tác dụng.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Không tạo oxit và hydroxit bền.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Xenon.",
    "flameTestColor": "Xanh lam tím rực rỡ",
    "flameTestHex": "#818cf8",
    "abundance": {
      "crust": "1.85 ppm",
      "ocean": "0.185 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Thành phần hữu cơ vi lượng.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Tương đối an toàn ở điều kiện phòng thí nghiệm tiêu chuẩn.",
    "discoveryHistory": {
      "discoverer": "Ramsay & Travers",
      "year": 1898,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Cs",
    "atomicNumber": 55,
    "nameEn": "Caesium",
    "nameVi": "Xesi",
    "nameLatin": "Caesium",
    "casNumber": "7440-46-2",
    "pubchemCid": 5354618,
    "etymology": "Đặt tên theo tiếng Latin \"Caesium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 1,
    "groupTraditional": "IA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkali_metal",
    "subCategoryNameVi": "Kim loại kiềm",
    "atomicMass": 132.91,
    "electronConfigFull": "[Xe] 6s¹",
    "electronConfigShort": "[Xe] 6s¹",
    "energyLevels": [
      2,
      8,
      18,
      18,
      8,
      1
    ],
    "valenceElectrons": 1,
    "atomicRadiusEmpirical": 125,
    "covalentRadius": 125,
    "ionicRadius": "Cs⁺ / Cs²⁺: ~70 pm",
    "vanDerWaalsRadius": 195,
    "isotopes": [
      {
        "name": "^133Cs",
        "mass": 132.91,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "1.93 g/cm³",
    "meltingPointC": 28.44,
    "boilingPointC": 671,
    "meltingPointK": 301.59,
    "boilingPointK": 944.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.79,
    "electronegativityAllen": 0.81,
    "electronegativityAllredRochow": 0.79,
    "ionizationEnergies": [
      375.7,
      2234.3
    ],
    "electronAffinity": 45.5,
    "oxidationStates": [
      1
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CsO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CsCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Phản ứng mãnh liệt tỏa nhiệt lớn sinh H₂.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Caesium.",
    "flameTestColor": "Xanh da trời / Xanh lam sáng (Sky blue)",
    "flameTestHex": "#38bdf8",
    "abundance": {
      "crust": "1.82 ppm",
      "ocean": "0.182 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 3,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Bunsen & Kirchhoff",
      "year": 1860,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ba",
    "atomicNumber": 56,
    "nameEn": "Barium",
    "nameVi": "Bari",
    "nameLatin": "Barium",
    "casNumber": "7440-39-3",
    "pubchemCid": 5355457,
    "etymology": "Đặt tên theo tiếng Latin \"Barium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 2,
    "groupTraditional": "IIA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkaline_earth",
    "subCategoryNameVi": "Kim loại kiềm thổ",
    "atomicMass": 137.33,
    "electronConfigFull": "[Xe] 6s²",
    "electronConfigShort": "[Xe] 6s²",
    "energyLevels": [
      2,
      8,
      18,
      18,
      8,
      2
    ],
    "valenceElectrons": 2,
    "atomicRadiusEmpirical": 126,
    "covalentRadius": 126,
    "ionicRadius": "Ba⁺ / Ba²⁺: ~70 pm",
    "vanDerWaalsRadius": 196,
    "isotopes": [
      {
        "name": "^137Ba",
        "mass": 137.33,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "3.51 g/cm³",
    "meltingPointC": 727,
    "boilingPointC": 1897,
    "meltingPointK": 1000.15,
    "boilingPointK": 2170.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.89,
    "electronegativityAllen": 0.91,
    "electronegativityAllredRochow": 0.89,
    "ionizationEnergies": [
      502.9,
      965.2
    ],
    "electronAffinity": 13.95,
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (BaO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (BaCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Barium.",
    "flameTestColor": "Xanh lá cây nõn chuối (Apple green)",
    "flameTestHex": "#84cc16",
    "abundance": {
      "crust": "1.79 ppm",
      "ocean": "0.179 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Scheele & Davy",
      "year": 1808,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "La",
    "atomicNumber": 57,
    "nameEn": "Lanthanum",
    "nameVi": "Lantan",
    "nameLatin": "Lanthanum",
    "casNumber": "7439-91-0",
    "pubchemCid": 23927,
    "etymology": "Đặt tên theo tiếng Latin \"Lanthanum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 138.91,
    "electronConfigFull": "[Xe] 5d¹ 6s²",
    "electronConfigShort": "[Xe] 5d¹ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      18,
      9,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 127,
    "covalentRadius": 127,
    "ionicRadius": "La⁺ / La²⁺: ~70 pm",
    "vanDerWaalsRadius": 197,
    "isotopes": [
      {
        "name": "^139La",
        "mass": 138.91,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "6.162 g/cm³",
    "meltingPointC": 920,
    "boilingPointC": 3464,
    "meltingPointK": 1193.15,
    "boilingPointK": 3737.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.1,
    "electronegativityAllen": 1.12,
    "electronegativityAllredRochow": 1.1,
    "ionizationEnergies": [
      538.1,
      1067
    ],
    "electronAffinity": 48,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (LaO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (LaCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Lanthanum.",
    "flameTestColor": "Trắng",
    "flameTestHex": "#f1f5f9",
    "abundance": {
      "crust": "1.75 ppm",
      "ocean": "0.175 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Carl Gustaf Mosander",
      "year": 1839,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ce",
    "atomicNumber": 58,
    "nameEn": "Cerium",
    "nameVi": "Xeri",
    "nameLatin": "Cerium",
    "casNumber": "7440-45-1",
    "pubchemCid": 23974,
    "etymology": "Đặt tên theo tiếng Latin \"Cerium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 140.12,
    "electronConfigFull": "[Xe] 4f¹ 5d¹ 6s²",
    "electronConfigShort": "[Xe] 4f¹ 5d¹ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      19,
      9,
      2
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 128,
    "covalentRadius": 128,
    "ionicRadius": "Ce⁺ / Ce²⁺: ~70 pm",
    "vanDerWaalsRadius": 198,
    "isotopes": [
      {
        "name": "^140Ce",
        "mass": 140.12,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "6.77 g/cm³",
    "meltingPointC": 795,
    "boilingPointC": 3443,
    "meltingPointK": 1068.15,
    "boilingPointK": 3716.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.12,
    "electronegativityAllen": 1.14,
    "electronegativityAllredRochow": 1.12,
    "ionizationEnergies": [
      534.4,
      1050
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3,
      4
    ],
    "commonOxidationStates": [
      3,
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CeO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CeCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Cerium.",
    "flameTestColor": "Trắng",
    "flameTestHex": "#f1f5f9",
    "abundance": {
      "crust": "1.72 ppm",
      "ocean": "0.172 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Klaproth & Berzelius",
      "year": 1803,
      "country": "Đức / Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Pr",
    "atomicNumber": 59,
    "nameEn": "Praseodymium",
    "nameVi": "Praseođim",
    "nameLatin": "Praseodymium",
    "casNumber": "7440-10-0",
    "pubchemCid": 23943,
    "etymology": "Đặt tên theo tiếng Latin \"Praseodymium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 140.91,
    "electronConfigFull": "[Xe] 4f³ 6s²",
    "electronConfigShort": "[Xe] 4f³ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      21,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 129,
    "covalentRadius": 129,
    "ionicRadius": "Pr⁺ / Pr²⁺: ~70 pm",
    "vanDerWaalsRadius": 199,
    "isotopes": [
      {
        "name": "^141Pr",
        "mass": 140.91,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "6.77 g/cm³",
    "meltingPointC": 931,
    "boilingPointC": 3520,
    "meltingPointK": 1204.15,
    "boilingPointK": 3793.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.13,
    "electronegativityAllen": 1.15,
    "electronegativityAllredRochow": 1.13,
    "ionizationEnergies": [
      527,
      1020
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3,
      4
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PrO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PrCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Praseodymium.",
    "flameTestColor": "Xanh lục",
    "flameTestHex": "#22c55e",
    "abundance": {
      "crust": "1.69 ppm",
      "ocean": "0.169 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Carl Auer von Welsbach",
      "year": 1885,
      "country": "Áo",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Nd",
    "atomicNumber": 60,
    "nameEn": "Neodymium",
    "nameVi": "Neođim",
    "nameLatin": "Neodymium",
    "casNumber": "7440-00-8",
    "pubchemCid": 23934,
    "etymology": "Đặt tên theo tiếng Latin \"Neodymium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 144.24,
    "electronConfigFull": "[Xe] 4f⁴ 6s²",
    "electronConfigShort": "[Xe] 4f⁴ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      22,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 130,
    "covalentRadius": 130,
    "ionicRadius": "Nd⁺ / Nd²⁺: ~70 pm",
    "vanDerWaalsRadius": 200,
    "isotopes": [
      {
        "name": "^144Nd",
        "mass": 144.24,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.01 g/cm³",
    "meltingPointC": 1024,
    "boilingPointC": 3074,
    "meltingPointK": 1297.15,
    "boilingPointK": 3347.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.14,
    "electronegativityAllen": 1.16,
    "electronegativityAllredRochow": 1.14,
    "ionizationEnergies": [
      533.1,
      1040
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (NdO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (NdCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Neodymium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.67 ppm",
      "ocean": "0.167 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Carl Auer von Welsbach",
      "year": 1885,
      "country": "Áo",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Pm",
    "atomicNumber": 61,
    "nameEn": "Promethium",
    "nameVi": "Prometi",
    "nameLatin": "Promethium",
    "casNumber": "7440-12-2",
    "pubchemCid": 23945,
    "etymology": "Đặt tên theo tiếng Latin \"Promethium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 145,
    "electronConfigFull": "[Xe] 4f⁵ 6s²",
    "electronConfigShort": "[Xe] 4f⁵ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      23,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 131,
    "covalentRadius": 131,
    "ionicRadius": "Pm⁺ / Pm²⁺: ~70 pm",
    "vanDerWaalsRadius": 201,
    "isotopes": [
      {
        "name": "^145Pm",
        "mass": 145,
        "abundance": "Phổ biến nhất",
        "isStable": false
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.26 g/cm³",
    "meltingPointC": 1042,
    "boilingPointC": 3000,
    "meltingPointK": 1315.15,
    "boilingPointK": 3273.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.13,
    "electronegativityAllen": 1.15,
    "electronegativityAllredRochow": 1.13,
    "ionizationEnergies": [
      540,
      1050
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PmO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PmCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Promethium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.64 ppm",
      "ocean": "0.164 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Jacob A. Marinsky",
      "year": 1945,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Sm",
    "atomicNumber": 62,
    "nameEn": "Samarium",
    "nameVi": "Samari",
    "nameLatin": "Samarium",
    "casNumber": "7440-19-9",
    "pubchemCid": 23952,
    "etymology": "Đặt tên theo tiếng Latin \"Samarium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 150.36,
    "electronConfigFull": "[Xe] 4f⁶ 6s²",
    "electronConfigShort": "[Xe] 4f⁶ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      24,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 132,
    "covalentRadius": 132,
    "ionicRadius": "Sm⁺ / Sm²⁺: ~70 pm",
    "vanDerWaalsRadius": 202,
    "isotopes": [
      {
        "name": "^150Sm",
        "mass": 150.36,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.52 g/cm³",
    "meltingPointC": 1072,
    "boilingPointC": 1803,
    "meltingPointK": 1345.15,
    "boilingPointK": 2076.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.17,
    "electronegativityAllen": 1.19,
    "electronegativityAllredRochow": 1.17,
    "ionizationEnergies": [
      544.5,
      1070
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      2,
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (SmO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (SmCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Samarium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.61 ppm",
      "ocean": "0.161 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Lecoq de Boisbaudran",
      "year": 1879,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Eu",
    "atomicNumber": 63,
    "nameEn": "Europium",
    "nameVi": "Europi",
    "nameLatin": "Europium",
    "casNumber": "7440-53-1",
    "pubchemCid": 23982,
    "etymology": "Đặt tên theo tiếng Latin \"Europium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 151.96,
    "electronConfigFull": "[Xe] 4f⁷ 6s²",
    "electronConfigShort": "[Xe] 4f⁷ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      25,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 133,
    "covalentRadius": 133,
    "ionicRadius": "Eu⁺ / Eu²⁺: ~70 pm",
    "vanDerWaalsRadius": 203,
    "isotopes": [
      {
        "name": "^152Eu",
        "mass": 151.96,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "5.244 g/cm³",
    "meltingPointC": 826,
    "boilingPointC": 1529,
    "meltingPointK": 1099.15,
    "boilingPointK": 1802.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.2,
    "electronegativityAllen": 1.22,
    "electronegativityAllredRochow": 1.2,
    "ionizationEnergies": [
      547.1,
      1085
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      2,
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (EuO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (EuCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Europium.",
    "flameTestColor": "Đỏ tươi huỳnh quang",
    "flameTestHex": "#ef4444",
    "abundance": {
      "crust": "1.59 ppm",
      "ocean": "0.159 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Eugène-Anatole Demarçay",
      "year": 1901,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Gd",
    "atomicNumber": 64,
    "nameEn": "Gadolinium",
    "nameVi": "Gađolini",
    "nameLatin": "Gadolinium",
    "casNumber": "7440-54-2",
    "pubchemCid": 23983,
    "etymology": "Đặt tên theo tiếng Latin \"Gadolinium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 157.25,
    "electronConfigFull": "[Xe] 4f⁷ 5d¹ 6s²",
    "electronConfigShort": "[Xe] 4f⁷ 5d¹ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      25,
      9,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 134,
    "covalentRadius": 134,
    "ionicRadius": "Gd⁺ / Gd²⁺: ~70 pm",
    "vanDerWaalsRadius": 204,
    "isotopes": [
      {
        "name": "^157Gd",
        "mass": 157.25,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "7.90 g/cm³",
    "meltingPointC": 1312,
    "boilingPointC": 3273,
    "meltingPointK": 1585.15,
    "boilingPointK": 3546.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.2,
    "electronegativityAllen": 1.22,
    "electronegativityAllredRochow": 1.2,
    "ionizationEnergies": [
      593.4,
      1170
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (GdO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (GdCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Gadolinium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.56 ppm",
      "ocean": "0.156 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "de Marignac",
      "year": 1880,
      "country": "Thụy Sĩ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Tb",
    "atomicNumber": 65,
    "nameEn": "Terbium",
    "nameVi": "Tebi",
    "nameLatin": "Terbium",
    "casNumber": "7440-27-9",
    "pubchemCid": 23957,
    "etymology": "Đặt tên theo tiếng Latin \"Terbium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 158.93,
    "electronConfigFull": "[Xe] 4f⁹ 6s²",
    "electronConfigShort": "[Xe] 4f⁹ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      27,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 135,
    "covalentRadius": 135,
    "ionicRadius": "Tb⁺ / Tb²⁺: ~70 pm",
    "vanDerWaalsRadius": 205,
    "isotopes": [
      {
        "name": "^159Tb",
        "mass": 158.93,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.23 g/cm³",
    "meltingPointC": 1356,
    "boilingPointC": 3230,
    "meltingPointK": 1629.15,
    "boilingPointK": 3503.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.2,
    "electronegativityAllen": 1.22,
    "electronegativityAllredRochow": 1.2,
    "ionizationEnergies": [
      565.8,
      1110
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3,
      4
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (TbO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (TbCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Terbium.",
    "flameTestColor": "Xanh lá cây huỳnh quang",
    "flameTestHex": "#22c55e",
    "abundance": {
      "crust": "1.54 ppm",
      "ocean": "0.154 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Carl Gustaf Mosander",
      "year": 1843,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Dy",
    "atomicNumber": 66,
    "nameEn": "Dysprosium",
    "nameVi": "Đisprozi",
    "nameLatin": "Dysprosium",
    "casNumber": "7429-91-6",
    "pubchemCid": 23979,
    "etymology": "Đặt tên theo tiếng Latin \"Dysprosium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 162.5,
    "electronConfigFull": "[Xe] 4f¹⁰ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁰ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      28,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 136,
    "covalentRadius": 136,
    "ionicRadius": "Dy⁺ / Dy²⁺: ~70 pm",
    "vanDerWaalsRadius": 206,
    "isotopes": [
      {
        "name": "^163Dy",
        "mass": 162.5,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.540 g/cm³",
    "meltingPointC": 1412,
    "boilingPointC": 2567,
    "meltingPointK": 1685.15,
    "boilingPointK": 2840.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.22,
    "electronegativityAllen": 1.24,
    "electronegativityAllredRochow": 1.22,
    "ionizationEnergies": [
      573,
      1130
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (DyO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (DyCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Dysprosium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.52 ppm",
      "ocean": "0.152 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Lecoq de Boisbaudran",
      "year": 1886,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ho",
    "atomicNumber": 67,
    "nameEn": "Holmium",
    "nameVi": "Honmi",
    "nameLatin": "Holmium",
    "casNumber": "7440-60-0",
    "pubchemCid": 23988,
    "etymology": "Đặt tên theo tiếng Latin \"Holmium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 164.93,
    "electronConfigFull": "[Xe] 4f¹¹ 6s²",
    "electronConfigShort": "[Xe] 4f¹¹ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      29,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 137,
    "covalentRadius": 137,
    "ionicRadius": "Ho⁺ / Ho²⁺: ~70 pm",
    "vanDerWaalsRadius": 207,
    "isotopes": [
      {
        "name": "^165Ho",
        "mass": 164.93,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.79 g/cm³",
    "meltingPointC": 1474,
    "boilingPointC": 2700,
    "meltingPointK": 1747.15,
    "boilingPointK": 2973.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.23,
    "electronegativityAllen": 1.25,
    "electronegativityAllredRochow": 1.23,
    "ionizationEnergies": [
      581,
      1140
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (HoO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (HoCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Holmium.",
    "flameTestColor": "Vàng huỳnh quang",
    "flameTestHex": "#fef08a",
    "abundance": {
      "crust": "1.49 ppm",
      "ocean": "0.149 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Per Teodor Cleve",
      "year": 1879,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Er",
    "atomicNumber": 68,
    "nameEn": "Erbium",
    "nameVi": "Eribi",
    "nameLatin": "Erbium",
    "casNumber": "7440-52-0",
    "pubchemCid": 23981,
    "etymology": "Đặt tên theo tiếng Latin \"Erbium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 167.26,
    "electronConfigFull": "[Xe] 4f¹² 6s²",
    "electronConfigShort": "[Xe] 4f¹² 6s²",
    "energyLevels": [
      2,
      8,
      18,
      30,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 138,
    "covalentRadius": 138,
    "ionicRadius": "Er⁺ / Er²⁺: ~70 pm",
    "vanDerWaalsRadius": 208,
    "isotopes": [
      {
        "name": "^167Er",
        "mass": 167.26,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "9.066 g/cm³",
    "meltingPointC": 1529,
    "boilingPointC": 2868,
    "meltingPointK": 1802.15,
    "boilingPointK": 3141.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.24,
    "electronegativityAllen": 1.26,
    "electronegativityAllredRochow": 1.24,
    "ionizationEnergies": [
      589.3,
      1150
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (ErO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (ErCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Erbium.",
    "flameTestColor": "Hồng",
    "flameTestHex": "#f472b6",
    "abundance": {
      "crust": "1.47 ppm",
      "ocean": "0.147 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Carl Gustaf Mosander",
      "year": 1843,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Tm",
    "atomicNumber": 69,
    "nameEn": "Thulium",
    "nameVi": "Tuli",
    "nameLatin": "Thulium",
    "casNumber": "7440-30-4",
    "pubchemCid": 23960,
    "etymology": "Đặt tên theo tiếng Latin \"Thulium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 168.93,
    "electronConfigFull": "[Xe] 4f¹³ 6s²",
    "electronConfigShort": "[Xe] 4f¹³ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      31,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 139,
    "covalentRadius": 139,
    "ionicRadius": "Tm⁺ / Tm²⁺: ~70 pm",
    "vanDerWaalsRadius": 209,
    "isotopes": [
      {
        "name": "^169Tm",
        "mass": 168.93,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "9.32 g/cm³",
    "meltingPointC": 1545,
    "boilingPointC": 1950,
    "meltingPointK": 1818.15,
    "boilingPointK": 2223.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.25,
    "electronegativityAllen": 1.27,
    "electronegativityAllredRochow": 1.25,
    "ionizationEnergies": [
      596.7,
      1160
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (TmO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (TmCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Thulium.",
    "flameTestColor": "Xanh lục",
    "flameTestHex": "#22c55e",
    "abundance": {
      "crust": "1.45 ppm",
      "ocean": "0.145 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Per Teodor Cleve",
      "year": 1879,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Yb",
    "atomicNumber": 70,
    "nameEn": "Ytterbium",
    "nameVi": "Ytebi",
    "nameLatin": "Ytterbium",
    "casNumber": "7440-64-4",
    "pubchemCid": 23992,
    "etymology": "Đặt tên theo tiếng Latin \"Ytterbium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 173.05,
    "electronConfigFull": "[Xe] 4f¹⁴ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      8,
      2
    ],
    "valenceElectrons": 2,
    "atomicRadiusEmpirical": 140,
    "covalentRadius": 140,
    "ionicRadius": "Yb⁺ / Yb²⁺: ~70 pm",
    "vanDerWaalsRadius": 210,
    "isotopes": [
      {
        "name": "^173Yb",
        "mass": 173.05,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "6.90 g/cm³",
    "meltingPointC": 824,
    "boilingPointC": 1196,
    "meltingPointK": 1097.15,
    "boilingPointK": 1469.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.1,
    "electronegativityAllen": 1.12,
    "electronegativityAllredRochow": 1.1,
    "ionizationEnergies": [
      603.4,
      1210
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      2,
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (YbO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (YbCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Ytterbium.",
    "flameTestColor": "Xanh lục",
    "flameTestHex": "#86efac",
    "abundance": {
      "crust": "1.43 ppm",
      "ocean": "0.143 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "de Marignac",
      "year": 1878,
      "country": "Thụy Sĩ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Lu",
    "atomicNumber": 71,
    "nameEn": "Lutetium",
    "nameVi": "Lutexi",
    "nameLatin": "Lutetium",
    "casNumber": "7439-94-3",
    "pubchemCid": 23929,
    "etymology": "Đặt tên theo tiếng Latin \"Lutetium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "lanthanoid",
    "subCategoryNameVi": "Họ Lantan",
    "atomicMass": 174.97,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      9,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 141,
    "covalentRadius": 141,
    "ionicRadius": "Lu⁺ / Lu²⁺: ~70 pm",
    "vanDerWaalsRadius": 211,
    "isotopes": [
      {
        "name": "^175Lu",
        "mass": 174.97,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "9.841 g/cm³",
    "meltingPointC": 1663,
    "boilingPointC": 3402,
    "meltingPointK": 1936.15,
    "boilingPointK": 3675.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.27,
    "electronegativityAllen": 1.3,
    "electronegativityAllredRochow": 1.27,
    "ionizationEnergies": [
      523.5,
      1340
    ],
    "electronAffinity": 50,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (LuO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (LuCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Lutetium.",
    "flameTestColor": "Trắng",
    "flameTestHex": "#f8fafc",
    "abundance": {
      "crust": "1.41 ppm",
      "ocean": "0.141 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Georges Urbain",
      "year": 1907,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Hf",
    "atomicNumber": 72,
    "nameEn": "Hafnium",
    "nameVi": "Hafni",
    "nameLatin": "Hafnium",
    "casNumber": "7440-58-6",
    "pubchemCid": 23986,
    "etymology": "Đặt tên theo tiếng Latin \"Hafnium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 4,
    "groupTraditional": "IVB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 178.49,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d² 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d² 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      10,
      2
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 142,
    "covalentRadius": 142,
    "ionicRadius": "Hf⁺ / Hf²⁺: ~70 pm",
    "vanDerWaalsRadius": 212,
    "isotopes": [
      {
        "name": "^178Hf",
        "mass": 178.49,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "13.31 g/cm³",
    "meltingPointC": 2233,
    "boilingPointC": 4603,
    "meltingPointK": 2506.15,
    "boilingPointK": 4876.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      658.5,
      1440
    ],
    "electronAffinity": 0,
    "oxidationStates": [
      4
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (HfO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (HfCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Hafnium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.39 ppm",
      "ocean": "0.139 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Coster & de Hevesy",
      "year": 1923,
      "country": "Đan Mạch",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ta",
    "atomicNumber": 73,
    "nameEn": "Tantalum",
    "nameVi": "Tantan",
    "nameLatin": "Tantalum",
    "casNumber": "7440-25-7",
    "pubchemCid": 23955,
    "etymology": "Đặt tên theo tiếng Latin \"Tantalum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 5,
    "groupTraditional": "VB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 180.95,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d³ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d³ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      11,
      2
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 143,
    "covalentRadius": 143,
    "ionicRadius": "Ta⁺ / Ta²⁺: ~70 pm",
    "vanDerWaalsRadius": 213,
    "isotopes": [
      {
        "name": "^181Ta",
        "mass": 180.95,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "16.69 g/cm³",
    "meltingPointC": 3017,
    "boilingPointC": 5458,
    "meltingPointK": 3290.15,
    "boilingPointK": 5731.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.5,
    "electronegativityAllen": 1.53,
    "electronegativityAllredRochow": 1.5,
    "ionizationEnergies": [
      761,
      1500
    ],
    "electronAffinity": 31,
    "oxidationStates": [
      5
    ],
    "commonOxidationStates": [
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (TaO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (TaCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Tantalum.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#94a3b8",
    "abundance": {
      "crust": "1.37 ppm",
      "ocean": "0.137 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Anders Gustaf Ekeberg",
      "year": 1802,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "W",
    "atomicNumber": 74,
    "nameEn": "Tungsten",
    "nameVi": "Vonfram",
    "nameLatin": "Wolframium",
    "casNumber": "7440-33-7",
    "pubchemCid": 23964,
    "etymology": "Đặt tên theo tiếng Latin \"Wolframium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 6,
    "groupTraditional": "VIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 183.84,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d⁴ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d⁴ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      12,
      2
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 144,
    "covalentRadius": 144,
    "ionicRadius": "W⁺ / W²⁺: ~70 pm",
    "vanDerWaalsRadius": 214,
    "isotopes": [
      {
        "name": "^184W",
        "mass": 183.84,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "19.25 g/cm³",
    "meltingPointC": 3422,
    "boilingPointC": 5930,
    "meltingPointK": 3695.15,
    "boilingPointK": 6203.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.36,
    "electronegativityAllen": 2.41,
    "electronegativityAllredRochow": 2.36,
    "ionizationEnergies": [
      770,
      1700
    ],
    "electronAffinity": 78.6,
    "oxidationStates": [
      4,
      6
    ],
    "commonOxidationStates": [
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (WO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (WCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Tungsten.",
    "flameTestColor": "Xanh lục vàng",
    "flameTestHex": "#bef264",
    "abundance": {
      "crust": "1.35 ppm",
      "ocean": "0.135 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Scheele / Elhuyar",
      "year": 1783,
      "country": "Tây Ban Nha",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Re",
    "atomicNumber": 75,
    "nameEn": "Rhenium",
    "nameVi": "Reni",
    "nameLatin": "Rhenium",
    "casNumber": "7440-15-5",
    "pubchemCid": 23948,
    "etymology": "Đặt tên theo tiếng Latin \"Rhenium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 7,
    "groupTraditional": "VIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 186.21,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d⁵ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d⁵ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      13,
      2
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 145,
    "covalentRadius": 145,
    "ionicRadius": "Re⁺ / Re²⁺: ~70 pm",
    "vanDerWaalsRadius": 215,
    "isotopes": [
      {
        "name": "^186Re",
        "mass": 186.21,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "21.02 g/cm³",
    "meltingPointC": 3186,
    "boilingPointC": 5596,
    "meltingPointK": 3459.15,
    "boilingPointK": 5869.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.9,
    "electronegativityAllen": 1.94,
    "electronegativityAllredRochow": 1.9,
    "ionizationEnergies": [
      760,
      1260
    ],
    "electronAffinity": 14.5,
    "oxidationStates": [
      4,
      6,
      7
    ],
    "commonOxidationStates": [
      7
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (ReO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (ReCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Rhenium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.33 ppm",
      "ocean": "0.133 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Noddack & Tacke",
      "year": 1925,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Os",
    "atomicNumber": 76,
    "nameEn": "Osmium",
    "nameVi": "Osimi",
    "nameLatin": "Osmium",
    "casNumber": "7440-04-2",
    "pubchemCid": 23937,
    "etymology": "Đặt tên theo tiếng Latin \"Osmium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 8,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 190.23,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d⁶ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d⁶ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      14,
      2
    ],
    "valenceElectrons": 8,
    "atomicRadiusEmpirical": 146,
    "covalentRadius": 146,
    "ionicRadius": "Os⁺ / Os²⁺: ~70 pm",
    "vanDerWaalsRadius": 216,
    "isotopes": [
      {
        "name": "^190Os",
        "mass": 190.23,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "22.59 g/cm³",
    "meltingPointC": 3033,
    "boilingPointC": 5012,
    "meltingPointK": 3306.15,
    "boilingPointK": 5285.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.2,
    "electronegativityAllen": 2.24,
    "electronegativityAllredRochow": 2.2,
    "ionizationEnergies": [
      840,
      1600
    ],
    "electronAffinity": 106.1,
    "oxidationStates": [
      2,
      3,
      4,
      8
    ],
    "commonOxidationStates": [
      4,
      8
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (OsO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (OsCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Osmium.",
    "flameTestColor": "Không màu",
    "flameTestHex": "#94a3b8",
    "abundance": {
      "crust": "1.32 ppm",
      "ocean": "0.132 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Smithson Tennant",
      "year": 1803,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ir",
    "atomicNumber": 77,
    "nameEn": "Iridium",
    "nameVi": "Iriđi",
    "nameLatin": "Iridium",
    "casNumber": "7439-88-5",
    "pubchemCid": 23924,
    "etymology": "Đặt tên theo tiếng Latin \"Iridium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 9,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 192.22,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d⁷ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d⁷ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      15,
      2
    ],
    "valenceElectrons": 9,
    "atomicRadiusEmpirical": 147,
    "covalentRadius": 147,
    "ionicRadius": "Ir⁺ / Ir²⁺: ~70 pm",
    "vanDerWaalsRadius": 217,
    "isotopes": [
      {
        "name": "^192Ir",
        "mass": 192.22,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "22.56 g/cm³",
    "meltingPointC": 2446,
    "boilingPointC": 4428,
    "meltingPointK": 2719.15,
    "boilingPointK": 4701.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.2,
    "electronegativityAllen": 2.24,
    "electronegativityAllredRochow": 2.2,
    "ionizationEnergies": [
      880,
      1600
    ],
    "electronAffinity": 151,
    "oxidationStates": [
      3,
      4
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (IrO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (IrCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Iridium.",
    "flameTestColor": "Không màu",
    "flameTestHex": "#f1f5f9",
    "abundance": {
      "crust": "1.30 ppm",
      "ocean": "0.130 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Smithson Tennant",
      "year": 1803,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Pt",
    "atomicNumber": 78,
    "nameEn": "Platinum",
    "nameVi": "Bạch kim",
    "nameLatin": "Platinum",
    "casNumber": "7440-06-4",
    "pubchemCid": 23939,
    "etymology": "Đặt tên theo tiếng Latin \"Platinum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 10,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 195.08,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d⁹ 6s¹",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d⁹ 6s¹",
    "energyLevels": [
      2,
      8,
      18,
      32,
      17,
      1
    ],
    "valenceElectrons": 10,
    "atomicRadiusEmpirical": 148,
    "covalentRadius": 148,
    "ionicRadius": "Pt⁺ / Pt²⁺: ~70 pm",
    "vanDerWaalsRadius": 218,
    "isotopes": [
      {
        "name": "^195Pt",
        "mass": 195.08,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "21.45 g/cm³",
    "meltingPointC": 1768.3,
    "boilingPointC": 3825,
    "meltingPointK": 2041.45,
    "boilingPointK": 4098.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.28,
    "electronegativityAllen": 2.33,
    "electronegativityAllredRochow": 2.28,
    "ionizationEnergies": [
      870,
      1791
    ],
    "electronAffinity": 205.3,
    "oxidationStates": [
      2,
      4
    ],
    "commonOxidationStates": [
      2,
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PtO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PtCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Platinum.",
    "flameTestColor": "Trắng bạc sáng",
    "flameTestHex": "#f8fafc",
    "abundance": {
      "crust": "1.28 ppm",
      "ocean": "0.128 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Antonio de Ulloa",
      "year": 1735,
      "country": "Tây Ban Nha",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Au",
    "atomicNumber": 79,
    "nameEn": "Gold",
    "nameVi": "Vàng",
    "nameLatin": "Aurum",
    "casNumber": "7440-57-5",
    "pubchemCid": 23985,
    "etymology": "Đặt tên theo tiếng Latin \"Aurum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 11,
    "groupTraditional": "IB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 196.97,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      1
    ],
    "valenceElectrons": 11,
    "atomicRadiusEmpirical": 149,
    "covalentRadius": 149,
    "ionicRadius": "Au⁺ / Au²⁺: ~70 pm",
    "vanDerWaalsRadius": 219,
    "isotopes": [
      {
        "name": "^197Au",
        "mass": 196.97,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "19.30 g/cm³",
    "meltingPointC": 1064.18,
    "boilingPointC": 2970,
    "meltingPointK": 1337.33,
    "boilingPointK": 3243.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.54,
    "electronegativityAllen": 2.59,
    "electronegativityAllredRochow": 2.54,
    "ionizationEnergies": [
      890.1,
      1980
    ],
    "electronAffinity": 222.8,
    "oxidationStates": [
      1,
      3
    ],
    "commonOxidationStates": [
      1,
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (AuO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (AuCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Gold.",
    "flameTestColor": "Ánh kim vàng",
    "flameTestHex": "#eab308",
    "abundance": {
      "crust": "1.27 ppm",
      "ocean": "0.127 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Cổ đại (~4000 TCN)",
      "year": "Cổ đại",
      "country": "Cận Đông",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Hg",
    "atomicNumber": 80,
    "nameEn": "Mercury",
    "nameVi": "Thủy ngân",
    "nameLatin": "Hydrargyrum",
    "casNumber": "7439-97-6",
    "pubchemCid": 23931,
    "etymology": "Đặt tên theo tiếng Latin \"Hydrargyrum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 12,
    "groupTraditional": "IIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 200.59,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      2
    ],
    "valenceElectrons": 12,
    "atomicRadiusEmpirical": 150,
    "covalentRadius": 110,
    "ionicRadius": "Hg⁺ / Hg²⁺: ~70 pm",
    "vanDerWaalsRadius": 180,
    "isotopes": [
      {
        "name": "^201Hg",
        "mass": 200.59,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "liquid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái lỏng",
    "density": "13.534 g/cm³",
    "meltingPointC": -38.83,
    "boilingPointC": 356.73,
    "meltingPointK": 234.32,
    "boilingPointK": 629.88,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2,
    "electronegativityAllen": 2.04,
    "electronegativityAllredRochow": 2,
    "ionizationEnergies": [
      1007.1,
      1810
    ],
    "electronAffinity": -48,
    "oxidationStates": [
      1,
      2
    ],
    "commonOxidationStates": [
      1,
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (HgO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (HgCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Mercury.",
    "flameTestColor": "Xanh lam lục nhạt",
    "flameTestHex": "#67e8f9",
    "abundance": {
      "crust": "1.25 ppm",
      "ocean": "0.125 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Cổ đại (~1500 TCN)",
      "year": "Cổ đại",
      "country": "Trung Quốc",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Tl",
    "atomicNumber": 81,
    "nameEn": "Thallium",
    "nameVi": "Tali",
    "nameLatin": "Thallium",
    "casNumber": "7440-28-0",
    "pubchemCid": 5359461,
    "etymology": "Đặt tên theo tiếng Latin \"Thallium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 13,
    "groupTraditional": "IIIA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 204.38,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      3
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 151,
    "covalentRadius": 111,
    "ionicRadius": "Tl⁺ / Tl²⁺: ~70 pm",
    "vanDerWaalsRadius": 181,
    "isotopes": [
      {
        "name": "^204Tl",
        "mass": 204.38,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "11.85 g/cm³",
    "meltingPointC": 304,
    "boilingPointC": 1473,
    "meltingPointK": 577.15,
    "boilingPointK": 1746.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.62,
    "electronegativityAllen": 1.65,
    "electronegativityAllredRochow": 1.62,
    "ionizationEnergies": [
      589.4,
      1971
    ],
    "electronAffinity": 19.2,
    "oxidationStates": [
      1,
      3
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (TlO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (TlCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Thallium.",
    "flameTestColor": "Xanh lục bảo (Emerald)",
    "flameTestHex": "#10b981",
    "abundance": {
      "crust": "1.23 ppm",
      "ocean": "0.123 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "William Crookes",
      "year": 1861,
      "country": "Anh",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Pb",
    "atomicNumber": 82,
    "nameEn": "Lead",
    "nameVi": "Chì",
    "nameLatin": "Plumbum",
    "casNumber": "7439-92-1",
    "pubchemCid": 5352425,
    "etymology": "Đặt tên theo tiếng Latin \"Plumbum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 14,
    "groupTraditional": "IVA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 207.2,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      4
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 152,
    "covalentRadius": 112,
    "ionicRadius": "Pb⁺ / Pb²⁺: ~70 pm",
    "vanDerWaalsRadius": 182,
    "isotopes": [
      {
        "name": "^207Pb",
        "mass": 207.2,
        "abundance": "Phổ biến nhất",
        "isStable": true
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "11.34 g/cm³",
    "meltingPointC": 327.46,
    "boilingPointC": 1749,
    "meltingPointK": 600.61,
    "boilingPointK": 2022.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.87,
    "electronegativityAllen": 1.91,
    "electronegativityAllredRochow": 1.87,
    "ionizationEnergies": [
      715.6,
      1450.4
    ],
    "electronAffinity": 35.1,
    "oxidationStates": [
      2,
      4
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PbO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PbCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Lead.",
    "flameTestColor": "Xám xanh lam",
    "flameTestHex": "#93c5fd",
    "abundance": {
      "crust": "1.22 ppm",
      "ocean": "0.122 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Cổ đại (~7000 TCN)",
      "year": "Cổ đại",
      "country": "Cận Đông",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Bi",
    "atomicNumber": 83,
    "nameEn": "Bismuth",
    "nameVi": "Bitmut",
    "nameLatin": "Bismuthum",
    "casNumber": "7440-69-9",
    "pubchemCid": 5359367,
    "etymology": "Đặt tên theo tiếng Latin \"Bismuthum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 15,
    "groupTraditional": "VA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 208.98,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      5
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 153,
    "covalentRadius": 113,
    "ionicRadius": "Bi⁺ / Bi²⁺: ~70 pm",
    "vanDerWaalsRadius": 183,
    "isotopes": [
      {
        "name": "^209Bi",
        "mass": 208.98,
        "abundance": "Phổ biến nhất",
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "9.78 g/cm³",
    "meltingPointC": 271.4,
    "boilingPointC": 1564,
    "meltingPointK": 544.55,
    "boilingPointK": 1837.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.02,
    "electronegativityAllen": 2.06,
    "electronegativityAllredRochow": 2.02,
    "ionizationEnergies": [
      703,
      1610
    ],
    "electronAffinity": 91.2,
    "oxidationStates": [
      3,
      5
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (BiO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (BiCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Bismuth.",
    "flameTestColor": "Xanh lam nhạt",
    "flameTestHex": "#60a5fa",
    "abundance": {
      "crust": "1.20 ppm",
      "ocean": "0.120 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Khoáng chất vi lượng hoặc không có vai trò sinh học rõ rệt.",
    "nfpa704": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "special": ""
    },
    "ghsClassification": [
      "Có thể gây kích ứng khi tiếp xúc trực tiếp"
    ],
    "ghsPictograms": [
      "harmful"
    ],
    "toxicityNotes": "Bản thân kim loại tương đối an toàn; bụi kim loại hoặc muối hòa tan có thể độc nếu tích tụ.",
    "discoveryHistory": {
      "discoverer": "Claude François Geoffroy",
      "year": 1753,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Po",
    "atomicNumber": 84,
    "nameEn": "Polonium",
    "nameVi": "Poloni",
    "nameLatin": "Polonium",
    "casNumber": "7440-08-6",
    "pubchemCid": 23941,
    "etymology": "Đặt tên theo tiếng Latin \"Polonium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 16,
    "groupTraditional": "VIA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 209,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      6
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 154,
    "covalentRadius": 114,
    "ionicRadius": "Po⁺ / Po²⁺: ~70 pm",
    "vanDerWaalsRadius": 184,
    "isotopes": [
      {
        "name": "^209Po",
        "mass": 209,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "9.196 g/cm³",
    "meltingPointC": 254,
    "boilingPointC": 962,
    "meltingPointK": 527.15,
    "boilingPointK": 1235.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2,
    "electronegativityAllen": 2.04,
    "electronegativityAllredRochow": 2,
    "ionizationEnergies": [
      812.1
    ],
    "electronAffinity": 183.3,
    "oxidationStates": [
      2,
      4
    ],
    "commonOxidationStates": [
      2,
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PoO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PoCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Polonium.",
    "flameTestColor": "Xanh lam phát quang",
    "flameTestHex": "#38bdf8",
    "abundance": {
      "crust": "1.19 ppm",
      "ocean": "0.119 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Marie & Pierre Curie",
      "year": 1898,
      "country": "Ba Lan / Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "At",
    "atomicNumber": 85,
    "nameEn": "Astatine",
    "nameVi": "Astatin",
    "nameLatin": "Astatum",
    "casNumber": "7440-68-8",
    "pubchemCid": 23996,
    "etymology": "Đặt tên theo tiếng Latin \"Astatum\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 17,
    "groupTraditional": "VIIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "halogen",
    "subCategoryNameVi": "Halogen",
    "atomicMass": 210,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      7
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 155,
    "covalentRadius": 115,
    "ionicRadius": "At⁺ / At²⁺: ~70 pm",
    "vanDerWaalsRadius": 185,
    "isotopes": [
      {
        "name": "^210At",
        "mass": 210,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "6.35 g/cm³",
    "meltingPointC": 302,
    "boilingPointC": 337,
    "meltingPointK": 575.15,
    "boilingPointK": 610.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.2,
    "electronegativityAllen": 2.24,
    "electronegativityAllredRochow": 2.2,
    "ionizationEnergies": [
      890
    ],
    "electronAffinity": 270.1,
    "oxidationStates": [
      -1,
      1,
      3,
      5
    ],
    "commonOxidationStates": [
      -1,
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (AtO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (AtCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Astatine.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.18 ppm",
      "ocean": "0.118 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Corson, Mackenzie & Segrè",
      "year": 1940,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Rn",
    "atomicNumber": 86,
    "nameEn": "Radon",
    "nameVi": "Rađon",
    "nameLatin": "Radon",
    "casNumber": "10043-92-2",
    "pubchemCid": 24848,
    "etymology": "Đặt tên theo tiếng Latin \"Radon\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 6,
    "group": 18,
    "groupTraditional": "VIIIA",
    "block": "p",
    "mainCategory": "noble_gas",
    "subCategory": "noble_gas",
    "subCategoryNameVi": "Khí hiếm",
    "atomicMass": 222,
    "electronConfigFull": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    "electronConfigShort": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      8
    ],
    "valenceElectrons": 0,
    "atomicRadiusEmpirical": 156,
    "covalentRadius": 116,
    "ionicRadius": "Rn⁺ / Rn²⁺: ~70 pm",
    "vanDerWaalsRadius": 186,
    "isotopes": [
      {
        "name": "^222Rn",
        "mass": 222,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "gas",
    "appearance": "Đơn chất phi kim, trạng thái gas",
    "density": "9.73 g/L",
    "meltingPointC": -71,
    "boilingPointC": -61.7,
    "meltingPointK": 202.15,
    "boilingPointK": 211.45,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 2.2,
    "electronegativityAllen": 2.24,
    "electronegativityAllredRochow": 2.2,
    "ionizationEnergies": [
      1037
    ],
    "electronAffinity": 0,
    "oxidationStates": [
      0,
      2
    ],
    "commonOxidationStates": [
      0
    ],
    "reactivity": {
      "withOxygen": "Hoàn toàn trơ hóa học với oxy.",
      "withChlorine": "Không phản ứng.",
      "withHydrogen": "Không phản ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Không tác dụng.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Không tạo oxit và hydroxit bền.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Radon.",
    "flameTestColor": "Đỏ phát quang",
    "flameTestHex": "#ef4444",
    "abundance": {
      "crust": "1.16 ppm",
      "ocean": "0.116 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Chiết xuất từ không khí lỏng, khoáng tự nhiên hoặc khí thiên nhiên.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Friedrich Ernst Dorn",
      "year": 1900,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Fr",
    "atomicNumber": 87,
    "nameEn": "Francium",
    "nameVi": "Franxi",
    "nameLatin": "Francium",
    "casNumber": "7440-73-5",
    "pubchemCid": 23984,
    "etymology": "Đặt tên theo tiếng Latin \"Francium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 1,
    "groupTraditional": "IA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkali_metal",
    "subCategoryNameVi": "Kim loại kiềm",
    "atomicMass": 223,
    "electronConfigFull": "[Rn] 7s¹",
    "electronConfigShort": "[Rn] 7s¹",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      8,
      1
    ],
    "valenceElectrons": 1,
    "atomicRadiusEmpirical": 157,
    "covalentRadius": 117,
    "ionicRadius": "Fr⁺ / Fr²⁺: ~70 pm",
    "vanDerWaalsRadius": 187,
    "isotopes": [
      {
        "name": "^223Fr",
        "mass": 223,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "2.48 g/cm³",
    "meltingPointC": 27,
    "boilingPointC": 677,
    "meltingPointK": 300.15,
    "boilingPointK": 950.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.7,
    "electronegativityAllen": 0.71,
    "electronegativityAllredRochow": 0.7,
    "ionizationEnergies": [
      380
    ],
    "electronAffinity": 46.9,
    "oxidationStates": [
      1
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (FrO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (FrCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Phản ứng mãnh liệt tỏa nhiệt lớn sinh H₂.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Francium.",
    "flameTestColor": "Đỏ thẫm",
    "flameTestHex": "#e11d48",
    "abundance": {
      "crust": "1.15 ppm",
      "ocean": "0.115 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 3,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Marguerite Perey",
      "year": 1939,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ra",
    "atomicNumber": 88,
    "nameEn": "Radium",
    "nameVi": "Rađi",
    "nameLatin": "Radium",
    "casNumber": "7440-14-4",
    "pubchemCid": 5359447,
    "etymology": "Đặt tên theo tiếng Latin \"Radium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 2,
    "groupTraditional": "IIA",
    "block": "s",
    "mainCategory": "metal",
    "subCategory": "alkaline_earth",
    "subCategoryNameVi": "Kim loại kiềm thổ",
    "atomicMass": 226,
    "electronConfigFull": "[Rn] 7s²",
    "electronConfigShort": "[Rn] 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      8,
      2
    ],
    "valenceElectrons": 2,
    "atomicRadiusEmpirical": 158,
    "covalentRadius": 118,
    "ionicRadius": "Ra⁺ / Ra²⁺: ~70 pm",
    "vanDerWaalsRadius": 188,
    "isotopes": [
      {
        "name": "^226Ra",
        "mass": 226,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "5.5 g/cm³",
    "meltingPointC": 700,
    "boilingPointC": 1737,
    "meltingPointK": 973.15,
    "boilingPointK": 2010.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 0.9,
    "electronegativityAllen": 0.92,
    "electronegativityAllredRochow": 0.9,
    "ionizationEnergies": [
      509.3,
      979
    ],
    "electronAffinity": 9.6,
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (RaO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (RaCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ mạnh và kiềm mạnh tan hoàn toàn trong nước.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Radium.",
    "flameTestColor": "Đỏ tươi rực (Crimson)",
    "flameTestHex": "#ef4444",
    "abundance": {
      "crust": "1.14 ppm",
      "ocean": "0.114 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Marie & Pierre Curie",
      "year": 1898,
      "country": "Ba Lan / Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ac",
    "atomicNumber": 89,
    "nameEn": "Actinium",
    "nameVi": "Actini",
    "nameLatin": "Actinium",
    "casNumber": "7440-34-8",
    "pubchemCid": 23966,
    "etymology": "Đặt tên theo tiếng Latin \"Actinium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 227,
    "electronConfigFull": "[Rn] 6d¹ 7s²",
    "electronConfigShort": "[Rn] 6d¹ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      9,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 159,
    "covalentRadius": 119,
    "ionicRadius": "Ac⁺ / Ac²⁺: ~70 pm",
    "vanDerWaalsRadius": 189,
    "isotopes": [
      {
        "name": "^227Ac",
        "mass": 227,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "10.07 g/cm³",
    "meltingPointC": 1050,
    "boilingPointC": 3198,
    "meltingPointK": 1323.15,
    "boilingPointK": 3471.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.1,
    "electronegativityAllen": 1.12,
    "electronegativityAllredRochow": 1.1,
    "ionizationEnergies": [
      499
    ],
    "electronAffinity": 33.8,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (AcO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (AcCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Actinium.",
    "flameTestColor": "Xanh lam phát quang",
    "flameTestHex": "#38bdf8",
    "abundance": {
      "crust": "1.12 ppm",
      "ocean": "0.112 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "André-Louis Debierne",
      "year": 1899,
      "country": "Pháp",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Th",
    "atomicNumber": 90,
    "nameEn": "Thorium",
    "nameVi": "Tori",
    "nameLatin": "Thorium",
    "casNumber": "7440-29-1",
    "pubchemCid": 23959,
    "etymology": "Đặt tên theo tiếng Latin \"Thorium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 232.04,
    "electronConfigFull": "[Rn] 6d² 7s²",
    "electronConfigShort": "[Rn] 6d² 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      18,
      10,
      2
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 160,
    "covalentRadius": 120,
    "ionicRadius": "Th⁺ / Th²⁺: ~70 pm",
    "vanDerWaalsRadius": 190,
    "isotopes": [
      {
        "name": "^232Th",
        "mass": 232.04,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "11.72 g/cm³",
    "meltingPointC": 1750,
    "boilingPointC": 4788,
    "meltingPointK": 2023.15,
    "boilingPointK": 5061.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      587
    ],
    "electronAffinity": 112.7,
    "oxidationStates": [
      4
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (ThO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (ThCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Thorium.",
    "flameTestColor": "Trắng chói",
    "flameTestHex": "#ffffff",
    "abundance": {
      "crust": "1.11 ppm",
      "ocean": "0.111 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Jöns Jacob Berzelius",
      "year": 1828,
      "country": "Thụy Điển",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Pa",
    "atomicNumber": 91,
    "nameEn": "Protactinium",
    "nameVi": "Protactini",
    "nameLatin": "Protactinium",
    "casNumber": "7440-13-3",
    "pubchemCid": 23946,
    "etymology": "Đặt tên theo tiếng Latin \"Protactinium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 231.04,
    "electronConfigFull": "[Rn] 5f² 6d¹ 7s²",
    "electronConfigShort": "[Rn] 5f² 6d¹ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      20,
      9,
      2
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 161,
    "covalentRadius": 121,
    "ionicRadius": "Pa⁺ / Pa²⁺: ~70 pm",
    "vanDerWaalsRadius": 191,
    "isotopes": [
      {
        "name": "^231Pa",
        "mass": 231.04,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "15.37 g/cm³",
    "meltingPointC": 1568,
    "boilingPointC": 4027,
    "meltingPointK": 1841.15,
    "boilingPointK": 4300.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.5,
    "electronegativityAllen": 1.53,
    "electronegativityAllredRochow": 1.5,
    "ionizationEnergies": [
      568
    ],
    "electronAffinity": 53,
    "oxidationStates": [
      4,
      5
    ],
    "commonOxidationStates": [
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PaO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PaCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Protactinium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.10 ppm",
      "ocean": "0.110 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Fajans & Göhring",
      "year": 1913,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "U",
    "atomicNumber": 92,
    "nameEn": "Uranium",
    "nameVi": "Urani",
    "nameLatin": "Uranium",
    "casNumber": "7440-61-1",
    "pubchemCid": 23989,
    "etymology": "Đặt tên theo tiếng Latin \"Uranium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 238.03,
    "electronConfigFull": "[Rn] 5f³ 6d¹ 7s²",
    "electronConfigShort": "[Rn] 5f³ 6d¹ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      21,
      9,
      2
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 162,
    "covalentRadius": 122,
    "ionicRadius": "U⁺ / U²⁺: ~70 pm",
    "vanDerWaalsRadius": 192,
    "isotopes": [
      {
        "name": "^238U",
        "mass": 238.03,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "19.1 g/cm³",
    "meltingPointC": 1135,
    "boilingPointC": 4131,
    "meltingPointK": 1408.15,
    "boilingPointK": 4404.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.38,
    "electronegativityAllen": 1.41,
    "electronegativityAllredRochow": 1.38,
    "ionizationEnergies": [
      597.6,
      1420
    ],
    "electronAffinity": 50.9,
    "oxidationStates": [
      3,
      4,
      5,
      6
    ],
    "commonOxidationStates": [
      4,
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (UO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (UCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Uranium.",
    "flameTestColor": "Xanh lục phát quang",
    "flameTestHex": "#84cc16",
    "abundance": {
      "crust": "1.09 ppm",
      "ocean": "0.109 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Nhiệt luyện, thủy luyện hoặc điện phân nóng chảy/dung dịch quặng.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Martin Heinrich Klaproth",
      "year": 1789,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Np",
    "atomicNumber": 93,
    "nameEn": "Neptunium",
    "nameVi": "Neptuni",
    "nameLatin": "Neptunium",
    "casNumber": "7439-99-8",
    "pubchemCid": 23933,
    "etymology": "Đặt tên theo tiếng Latin \"Neptunium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 237,
    "electronConfigFull": "[Rn] 5f⁴ 6d¹ 7s²",
    "electronConfigShort": "[Rn] 5f⁴ 6d¹ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      22,
      9,
      2
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 163,
    "covalentRadius": 123,
    "ionicRadius": "Np⁺ / Np²⁺: ~70 pm",
    "vanDerWaalsRadius": 193,
    "isotopes": [
      {
        "name": "^237Np",
        "mass": 237,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "20.45 g/cm³",
    "meltingPointC": 644,
    "boilingPointC": 3902,
    "meltingPointK": 917.15,
    "boilingPointK": 4175.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.36,
    "electronegativityAllen": 1.39,
    "electronegativityAllredRochow": 1.36,
    "ionizationEnergies": [
      604.5
    ],
    "electronAffinity": 45.8,
    "oxidationStates": [
      3,
      4,
      5,
      6,
      7
    ],
    "commonOxidationStates": [
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (NpO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (NpCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Neptunium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.08 ppm",
      "ocean": "0.108 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "McMillan & Abelson",
      "year": 1940,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Pu",
    "atomicNumber": 94,
    "nameEn": "Plutonium",
    "nameVi": "Plutoni",
    "nameLatin": "Plutonium",
    "casNumber": "7440-07-5",
    "pubchemCid": 23940,
    "etymology": "Đặt tên theo tiếng Latin \"Plutonium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 244,
    "electronConfigFull": "[Rn] 5f⁶ 7s²",
    "electronConfigShort": "[Rn] 5f⁶ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      24,
      8,
      2
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 164,
    "covalentRadius": 124,
    "ionicRadius": "Pu⁺ / Pu²⁺: ~70 pm",
    "vanDerWaalsRadius": 194,
    "isotopes": [
      {
        "name": "^244Pu",
        "mass": 244,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "19.86 g/cm³",
    "meltingPointC": 640,
    "boilingPointC": 3228,
    "meltingPointK": 913.15,
    "boilingPointK": 3501.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.28,
    "electronegativityAllen": 1.31,
    "electronegativityAllredRochow": 1.28,
    "ionizationEnergies": [
      584.7
    ],
    "electronAffinity": -48.3,
    "oxidationStates": [
      3,
      4,
      5,
      6
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (PuO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (PuCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Plutonium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.06 ppm",
      "ocean": "0.106 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Glenn T. Seaborg et al.",
      "year": 1940,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Am",
    "atomicNumber": 95,
    "nameEn": "Americium",
    "nameVi": "Amerixi",
    "nameLatin": "Americium",
    "casNumber": "7440-35-9",
    "pubchemCid": 23967,
    "etymology": "Đặt tên theo tiếng Latin \"Americium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 243,
    "electronConfigFull": "[Rn] 5f⁷ 7s²",
    "electronConfigShort": "[Rn] 5f⁷ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      25,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 165,
    "covalentRadius": 125,
    "ionicRadius": "Am⁺ / Am²⁺: ~70 pm",
    "vanDerWaalsRadius": 195,
    "isotopes": [
      {
        "name": "^243Am",
        "mass": 243,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "13.67 g/cm³",
    "meltingPointC": 1176,
    "boilingPointC": 2607,
    "meltingPointK": 1449.15,
    "boilingPointK": 2880.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      578
    ],
    "electronAffinity": 9.9,
    "oxidationStates": [
      3,
      4
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (AmO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (AmCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Americium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.05 ppm",
      "ocean": "0.105 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Glenn T. Seaborg et al.",
      "year": 1944,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Cm",
    "atomicNumber": 96,
    "nameEn": "Curium",
    "nameVi": "Curi",
    "nameLatin": "Curium",
    "casNumber": "7440-51-9",
    "pubchemCid": 23980,
    "etymology": "Đặt tên theo tiếng Latin \"Curium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 247,
    "electronConfigFull": "[Rn] 5f⁷ 6d¹ 7s²",
    "electronConfigShort": "[Rn] 5f⁷ 6d¹ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      25,
      9,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 166,
    "covalentRadius": 126,
    "ionicRadius": "Cm⁺ / Cm²⁺: ~70 pm",
    "vanDerWaalsRadius": 196,
    "isotopes": [
      {
        "name": "^247Cm",
        "mass": 247,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "13.51 g/cm³",
    "meltingPointC": 1345,
    "boilingPointC": 3110,
    "meltingPointK": 1618.15,
    "boilingPointK": 3383.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      581
    ],
    "electronAffinity": 27.2,
    "oxidationStates": [
      3,
      4
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CmO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CmCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Curium.",
    "flameTestColor": "Tím phát quang",
    "flameTestHex": "#c084fc",
    "abundance": {
      "crust": "1.04 ppm",
      "ocean": "0.104 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Glenn T. Seaborg et al.",
      "year": 1944,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Bk",
    "atomicNumber": 97,
    "nameEn": "Berkelium",
    "nameVi": "Bẹc-keli",
    "nameLatin": "Berkelium",
    "casNumber": "7440-40-6",
    "pubchemCid": 23972,
    "etymology": "Đặt tên theo tiếng Latin \"Berkelium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 247,
    "electronConfigFull": "[Rn] 5f⁹ 7s²",
    "electronConfigShort": "[Rn] 5f⁹ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      27,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 167,
    "covalentRadius": 127,
    "ionicRadius": "Bk⁺ / Bk²⁺: ~70 pm",
    "vanDerWaalsRadius": 197,
    "isotopes": [
      {
        "name": "^247Bk",
        "mass": 247,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "14.78 g/cm³",
    "meltingPointC": 986,
    "boilingPointC": 2627,
    "meltingPointK": 1259.15,
    "boilingPointK": 2900.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      601
    ],
    "electronAffinity": -165.2,
    "oxidationStates": [
      3,
      4
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (BkO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (BkCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Berkelium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.03 ppm",
      "ocean": "0.103 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "UC Berkeley Lab",
      "year": 1949,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Cf",
    "atomicNumber": 98,
    "nameEn": "Californium",
    "nameVi": "Californi",
    "nameLatin": "Californium",
    "casNumber": "7440-71-3",
    "pubchemCid": 23975,
    "etymology": "Đặt tên theo tiếng Latin \"Californium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 251,
    "electronConfigFull": "[Rn] 5f¹⁰ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁰ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      28,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 168,
    "covalentRadius": 128,
    "ionicRadius": "Cf⁺ / Cf²⁺: ~70 pm",
    "vanDerWaalsRadius": 198,
    "isotopes": [
      {
        "name": "^251Cf",
        "mass": 251,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "15.1 g/cm³",
    "meltingPointC": 900,
    "boilingPointC": 1470,
    "meltingPointK": 1173.15,
    "boilingPointK": 1743.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      608
    ],
    "electronAffinity": -97.3,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CfO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CfCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Californium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.02 ppm",
      "ocean": "0.102 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "UC Berkeley Lab",
      "year": 1950,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Es",
    "atomicNumber": 99,
    "nameEn": "Einsteinium",
    "nameVi": "Ensteni",
    "nameLatin": "Einsteinium",
    "casNumber": "7429-92-7",
    "pubchemCid": 23983,
    "etymology": "Đặt tên theo tiếng Latin \"Einsteinium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 252,
    "electronConfigFull": "[Rn] 5f¹¹ 7s²",
    "electronConfigShort": "[Rn] 5f¹¹ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      29,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 169,
    "covalentRadius": 129,
    "ionicRadius": "Es⁺ / Es²⁺: ~70 pm",
    "vanDerWaalsRadius": 199,
    "isotopes": [
      {
        "name": "^252Es",
        "mass": 252,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "8.84 g/cm³",
    "meltingPointC": 860,
    "boilingPointC": 996,
    "meltingPointK": 1133.15,
    "boilingPointK": 1269.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      619
    ],
    "electronAffinity": -28.6,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (EsO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (EsCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Einsteinium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.01 ppm",
      "ocean": "0.101 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Albert Ghiorso et al.",
      "year": 1952,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Fm",
    "atomicNumber": 100,
    "nameEn": "Fermium",
    "nameVi": "Fecmi",
    "nameLatin": "Fermium",
    "casNumber": "7440-72-4",
    "pubchemCid": 23971,
    "etymology": "Đặt tên theo tiếng Latin \"Fermium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 257,
    "electronConfigFull": "[Rn] 5f¹² 7s²",
    "electronConfigShort": "[Rn] 5f¹² 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      30,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 120,
    "covalentRadius": 130,
    "ionicRadius": "Fm⁺ / Fm²⁺: ~70 pm",
    "vanDerWaalsRadius": 200,
    "isotopes": [
      {
        "name": "^257Fm",
        "mass": 257,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "9.7 g/cm³",
    "meltingPointC": 1527,
    "meltingPointK": 1800.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      627
    ],
    "electronAffinity": 33.9,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (FmO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (FmCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Fermium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "1.00 ppm",
      "ocean": "0.100 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Albert Ghiorso et al.",
      "year": 1952,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Md",
    "atomicNumber": 101,
    "nameEn": "Mendelevium",
    "nameVi": "Menđelevi",
    "nameLatin": "Mendelevium",
    "casNumber": "7440-11-1",
    "pubchemCid": 23944,
    "etymology": "Đặt tên theo tiếng Latin \"Mendelevium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 258,
    "electronConfigFull": "[Rn] 5f¹³ 7s²",
    "electronConfigShort": "[Rn] 5f¹³ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      31,
      8,
      2
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 121,
    "covalentRadius": 131,
    "ionicRadius": "Md⁺ / Md²⁺: ~70 pm",
    "vanDerWaalsRadius": 201,
    "isotopes": [
      {
        "name": "^258Md",
        "mass": 258,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "10.3 g/cm³",
    "meltingPointC": 827,
    "meltingPointK": 1100.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      635
    ],
    "electronAffinity": 93.9,
    "oxidationStates": [
      2,
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (MdO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (MdCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Mendelevium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.99 ppm",
      "ocean": "0.099 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Albert Ghiorso, Seaborg et al.",
      "year": 1955,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "No",
    "atomicNumber": 102,
    "nameEn": "Nobelium",
    "nameVi": "Nobeli",
    "nameLatin": "Nobelium",
    "casNumber": "10028-14-5",
    "pubchemCid": 23935,
    "etymology": "Đặt tên theo tiếng Latin \"Nobelium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "f",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 259,
    "electronConfigFull": "[Rn] 5f¹⁴ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      8,
      2
    ],
    "valenceElectrons": 2,
    "atomicRadiusEmpirical": 122,
    "covalentRadius": 132,
    "ionicRadius": "No⁺ / No²⁺: ~70 pm",
    "vanDerWaalsRadius": 202,
    "isotopes": [
      {
        "name": "^259No",
        "mass": 259,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "9.9 g/cm³",
    "meltingPointC": 827,
    "meltingPointK": 1100.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      642
    ],
    "electronAffinity": -223.2,
    "oxidationStates": [
      2,
      3
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (NoO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (NoCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Nobelium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.98 ppm",
      "ocean": "0.098 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Viện Dubna / UC Berkeley",
      "year": 1966,
      "country": "Nga / Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Lr",
    "atomicNumber": 103,
    "nameEn": "Lawrencium",
    "nameVi": "Lorenxi",
    "nameLatin": "Lawrencium",
    "casNumber": "22537-19-5",
    "pubchemCid": 23928,
    "etymology": "Đặt tên theo tiếng Latin \"Lawrencium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 3,
    "groupTraditional": "IIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "actinoid",
    "subCategoryNameVi": "Họ Actini",
    "atomicMass": 266,
    "electronConfigFull": "[Rn] 5f¹⁴ 7s² 7p¹",
    "electronConfigShort": "[Rn] 5f¹⁴ 7s² 7p¹",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      8,
      3
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 123,
    "covalentRadius": 133,
    "ionicRadius": "Lr⁺ / Lr²⁺: ~70 pm",
    "vanDerWaalsRadius": 203,
    "isotopes": [
      {
        "name": "^266Lr",
        "mass": 266,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "15.6 g/cm³",
    "meltingPointC": 1627,
    "meltingPointK": 1900.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "electronegativityPauling": 1.3,
    "electronegativityAllen": 1.33,
    "electronegativityAllredRochow": 1.3,
    "ionizationEnergies": [
      470
    ],
    "electronAffinity": -30,
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (LrO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (LrCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Lawrencium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.97 ppm",
      "ocean": "0.097 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Ghiorso et al. / Dubna",
      "year": 1961,
      "country": "Mỹ / Nga",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Rf",
    "atomicNumber": 104,
    "nameEn": "Rutherfordium",
    "nameVi": "Rutherforđi",
    "nameLatin": "Rutherfordium",
    "casNumber": "53850-36-5",
    "pubchemCid": 23950,
    "etymology": "Đặt tên theo tiếng Latin \"Rutherfordium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 4,
    "groupTraditional": "IVB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 267,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d² 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d² 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      10,
      2
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 124,
    "covalentRadius": 134,
    "ionicRadius": "Rf⁺ / Rf²⁺: ~70 pm",
    "vanDerWaalsRadius": 204,
    "isotopes": [
      {
        "name": "^267Rf",
        "mass": 267,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "23.2 g/cm³",
    "meltingPointC": 2100,
    "boilingPointC": 5500,
    "meltingPointK": 2373.15,
    "boilingPointK": 5773.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      580
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      4
    ],
    "commonOxidationStates": [
      4
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (RfO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (RfCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Rutherfordium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.96 ppm",
      "ocean": "0.096 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Dubna & Berkeley",
      "year": 1969,
      "country": "Nga / Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Db",
    "atomicNumber": 105,
    "nameEn": "Dubnium",
    "nameVi": "Đubni",
    "nameLatin": "Dubnium",
    "casNumber": "54031-80-8",
    "pubchemCid": 23977,
    "etymology": "Đặt tên theo tiếng Latin \"Dubnium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 5,
    "groupTraditional": "VB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 268,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d³ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d³ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      11,
      2
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 125,
    "covalentRadius": 135,
    "ionicRadius": "Db⁺ / Db²⁺: ~70 pm",
    "vanDerWaalsRadius": 205,
    "isotopes": [
      {
        "name": "^268Db",
        "mass": 268,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "29.3 g/cm³",
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      660
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      5
    ],
    "commonOxidationStates": [
      5
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (DbO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (DbCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Dubnium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.95 ppm",
      "ocean": "0.095 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Dubna & Berkeley",
      "year": 1970,
      "country": "Nga / Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Sg",
    "atomicNumber": 106,
    "nameEn": "Seaborgium",
    "nameVi": "Seaborđi",
    "nameLatin": "Seaborgium",
    "casNumber": "54038-81-2",
    "pubchemCid": 23958,
    "etymology": "Đặt tên theo tiếng Latin \"Seaborgium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 6,
    "groupTraditional": "VIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 269,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d⁴ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d⁴ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      12,
      2
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 126,
    "covalentRadius": 136,
    "ionicRadius": "Sg⁺ / Sg²⁺: ~70 pm",
    "vanDerWaalsRadius": 206,
    "isotopes": [
      {
        "name": "^269Sg",
        "mass": 269,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "35.0 g/cm³",
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      757
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      6
    ],
    "commonOxidationStates": [
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (SgO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (SgCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Seaborgium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.94 ppm",
      "ocean": "0.094 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "Lawrence Berkeley Lab",
      "year": 1974,
      "country": "Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Bh",
    "atomicNumber": 107,
    "nameEn": "Bohrium",
    "nameVi": "Bohri",
    "nameLatin": "Bohrium",
    "casNumber": "54037-14-8",
    "pubchemCid": 23970,
    "etymology": "Đặt tên theo tiếng Latin \"Bohrium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 7,
    "groupTraditional": "VIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 270,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d⁵ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d⁵ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      13,
      2
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 127,
    "covalentRadius": 137,
    "ionicRadius": "Bh⁺ / Bh²⁺: ~70 pm",
    "vanDerWaalsRadius": 207,
    "isotopes": [
      {
        "name": "^270Bh",
        "mass": 270,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "37.1 g/cm³",
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      740
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      7
    ],
    "commonOxidationStates": [
      7
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (BhO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (BhCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Bohrium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.93 ppm",
      "ocean": "0.093 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "GSI Darmstadt",
      "year": 1981,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Hs",
    "atomicNumber": 108,
    "nameEn": "Hassium",
    "nameVi": "Hasi",
    "nameLatin": "Hassium",
    "casNumber": "54037-57-9",
    "pubchemCid": 23985,
    "etymology": "Đặt tên theo tiếng Latin \"Hassium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 8,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 269,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d⁶ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d⁶ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      14,
      2
    ],
    "valenceElectrons": 8,
    "atomicRadiusEmpirical": 128,
    "covalentRadius": 138,
    "ionicRadius": "Hs⁺ / Hs²⁺: ~70 pm",
    "vanDerWaalsRadius": 208,
    "isotopes": [
      {
        "name": "^269Hs",
        "mass": 269,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "40.7 g/cm³",
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      730
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      8
    ],
    "commonOxidationStates": [
      8
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (HsO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (HsCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Hassium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.93 ppm",
      "ocean": "0.093 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "GSI Darmstadt",
      "year": 1984,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Mt",
    "atomicNumber": 109,
    "nameEn": "Meitnerium",
    "nameVi": "Maitneri",
    "nameLatin": "Meitnerium",
    "casNumber": "54038-01-6",
    "pubchemCid": 23938,
    "etymology": "Đặt tên theo tiếng Latin \"Meitnerium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 9,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 278,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d⁷ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d⁷ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      15,
      2
    ],
    "valenceElectrons": 9,
    "atomicRadiusEmpirical": 129,
    "covalentRadius": 139,
    "ionicRadius": "Mt⁺ / Mt²⁺: ~70 pm",
    "vanDerWaalsRadius": 209,
    "isotopes": [
      {
        "name": "^278Mt",
        "mass": 278,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "37.4 g/cm³",
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      800
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      9
    ],
    "commonOxidationStates": [
      9
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (MtO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (MtCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Meitnerium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.92 ppm",
      "ocean": "0.092 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "GSI Darmstadt",
      "year": 1982,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ds",
    "atomicNumber": 110,
    "nameEn": "Darmstadtium",
    "nameVi": "Đamstati",
    "nameLatin": "Darmstadtium",
    "casNumber": "54083-77-1",
    "pubchemCid": 23980,
    "etymology": "Đặt tên theo tiếng Latin \"Darmstadtium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 10,
    "groupTraditional": "VIIIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 281,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d⁸ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d⁸ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      16,
      2
    ],
    "valenceElectrons": 10,
    "atomicRadiusEmpirical": 130,
    "covalentRadius": 140,
    "ionicRadius": "Ds⁺ / Ds²⁺: ~70 pm",
    "vanDerWaalsRadius": 210,
    "isotopes": [
      {
        "name": "^281Ds",
        "mass": 281,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "34.8 g/cm³",
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      960
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      6
    ],
    "commonOxidationStates": [
      6
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (DsO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (DsCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Darmstadtium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.91 ppm",
      "ocean": "0.091 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "GSI Darmstadt",
      "year": 1994,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Rg",
    "atomicNumber": 111,
    "nameEn": "Roentgenium",
    "nameVi": "Rơngen",
    "nameLatin": "Roentgenium",
    "casNumber": "54386-24-2",
    "pubchemCid": 23947,
    "etymology": "Đặt tên theo tiếng Latin \"Roentgenium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 11,
    "groupTraditional": "IB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 282,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d⁹ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d⁹ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      17,
      2
    ],
    "valenceElectrons": 11,
    "atomicRadiusEmpirical": 131,
    "covalentRadius": 141,
    "ionicRadius": "Rg⁺ / Rg²⁺: ~70 pm",
    "vanDerWaalsRadius": 211,
    "isotopes": [
      {
        "name": "^282Rg",
        "mass": 282,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "28.7 g/cm³",
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      1020
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      3
    ],
    "commonOxidationStates": [
      3
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (RgO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (RgCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Roentgenium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.90 ppm",
      "ocean": "0.090 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "GSI Darmstadt",
      "year": 1994,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Cn",
    "atomicNumber": 112,
    "nameEn": "Copernicium",
    "nameVi": "Copernixi",
    "nameLatin": "Copernicium",
    "casNumber": "54084-26-3",
    "pubchemCid": 23976,
    "etymology": "Đặt tên theo tiếng Latin \"Copernicium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 12,
    "groupTraditional": "IIB",
    "block": "d",
    "mainCategory": "metal",
    "subCategory": "transition_metal",
    "subCategoryNameVi": "Kim loại chuyển tiếp",
    "atomicMass": 285,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      18,
      2
    ],
    "valenceElectrons": 12,
    "atomicRadiusEmpirical": 132,
    "covalentRadius": 142,
    "ionicRadius": "Cn⁺ / Cn²⁺: ~70 pm",
    "vanDerWaalsRadius": 212,
    "isotopes": [
      {
        "name": "^285Cn",
        "mass": 285,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "liquid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái lỏng",
    "density": "23.7 g/cm³",
    "meltingPointC": 10,
    "boilingPointC": 67,
    "meltingPointK": 283.15,
    "boilingPointK": 340.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      1155
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      2
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (CnO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (CnCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit bazơ hoặc lưỡng tính tùy số oxi hóa; hydroxit tương ứng không tan.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Copernicium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.89 ppm",
      "ocean": "0.089 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "GSI Darmstadt",
      "year": 1996,
      "country": "Đức",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Nh",
    "atomicNumber": 113,
    "nameEn": "Nihonium",
    "nameVi": "Nihoni",
    "nameLatin": "Nihonium",
    "casNumber": "54084-70-7",
    "pubchemCid": 23934,
    "etymology": "Đặt tên theo tiếng Latin \"Nihonium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 13,
    "groupTraditional": "IIIA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 286,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      18,
      3
    ],
    "valenceElectrons": 3,
    "atomicRadiusEmpirical": 133,
    "covalentRadius": 143,
    "ionicRadius": "Nh⁺ / Nh²⁺: ~70 pm",
    "vanDerWaalsRadius": 213,
    "isotopes": [
      {
        "name": "^286Nh",
        "mass": 286,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "16 g/cm³",
    "meltingPointC": 430,
    "boilingPointC": 1130,
    "meltingPointK": 703.15,
    "boilingPointK": 1403.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      704.9
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      1,
      3
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (NhO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (NhCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Nihonium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.88 ppm",
      "ocean": "0.088 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "RIKEN",
      "year": 2004,
      "country": "Nhật Bản",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Fl",
    "atomicNumber": 114,
    "nameEn": "Flerovium",
    "nameVi": "Flerovi",
    "nameLatin": "Flerovium",
    "casNumber": "54085-16-4",
    "pubchemCid": 23984,
    "etymology": "Đặt tên theo tiếng Latin \"Flerovium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 14,
    "groupTraditional": "IVA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 289,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      18,
      4
    ],
    "valenceElectrons": 4,
    "atomicRadiusEmpirical": 134,
    "covalentRadius": 144,
    "ionicRadius": "Fl⁺ / Fl²⁺: ~70 pm",
    "vanDerWaalsRadius": 214,
    "isotopes": [
      {
        "name": "^289Fl",
        "mass": 289,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "14 g/cm³",
    "meltingPointC": -73,
    "boilingPointC": 107,
    "meltingPointK": 200.15,
    "boilingPointK": 380.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      823.9
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      2,
      4
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (FlO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (FlCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Flerovium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.88 ppm",
      "ocean": "0.088 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "JINR Dubna & LLNL",
      "year": 1998,
      "country": "Nga / Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Mc",
    "atomicNumber": 115,
    "nameEn": "Moscovium",
    "nameVi": "Moscovi",
    "nameLatin": "Moscovium",
    "casNumber": "54085-64-2",
    "pubchemCid": 23942,
    "etymology": "Đặt tên theo tiếng Latin \"Moscovium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 15,
    "groupTraditional": "VA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 290,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      18,
      5
    ],
    "valenceElectrons": 5,
    "atomicRadiusEmpirical": 135,
    "covalentRadius": 145,
    "ionicRadius": "Mc⁺ / Mc²⁺: ~70 pm",
    "vanDerWaalsRadius": 215,
    "isotopes": [
      {
        "name": "^290Mc",
        "mass": 290,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "13.5 g/cm³",
    "meltingPointC": 400,
    "boilingPointC": 1100,
    "meltingPointK": 673.15,
    "boilingPointK": 1373.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      538.3
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      1,
      3
    ],
    "commonOxidationStates": [
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (McO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (McCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Moscovium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.87 ppm",
      "ocean": "0.087 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "JINR Dubna & LLNL",
      "year": 2003,
      "country": "Nga / Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Lv",
    "atomicNumber": 116,
    "nameEn": "Livermorium",
    "nameVi": "Livemori",
    "nameLatin": "Livermorium",
    "casNumber": "54100-71-9",
    "pubchemCid": 23929,
    "etymology": "Đặt tên theo tiếng Latin \"Livermorium\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 16,
    "groupTraditional": "VIA",
    "block": "p",
    "mainCategory": "metal",
    "subCategory": "post_transition",
    "subCategoryNameVi": "Kim loại sau chuyển tiếp",
    "atomicMass": 293,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      18,
      6
    ],
    "valenceElectrons": 6,
    "atomicRadiusEmpirical": 136,
    "covalentRadius": 146,
    "ionicRadius": "Lv⁺ / Lv²⁺: ~70 pm",
    "vanDerWaalsRadius": 216,
    "isotopes": [
      {
        "name": "^293Lv",
        "mass": 293,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Kim loại màu xám bạc ánh kim, trạng thái rắn",
    "density": "12.9 g/cm³",
    "meltingPointC": 435,
    "boilingPointC": 1085,
    "meltingPointK": 708.15,
    "boilingPointK": 1358.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Dẫn điện tốt",
    "electricalResistivity": "10⁻⁸ - 10⁻⁷ Ω·m",
    "thermalConductivity": 50,
    "crystalStructure": "FCC / BCC / HCP",
    "crystalStructureVi": "Mạng tinh thể kim loại",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      723.6
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      2,
      4
    ],
    "commonOxidationStates": [
      2
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (LvO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (LvCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Bền với nước ở nhiệt độ thường do màng oxit hoặc thế điện cực.",
      "withAcids": "Tan trong dung dịch axit loãng giải phóng H₂ hoặc tác dụng axit oxi hóa mạnh HNO₃/H₂SO₄ đặc.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Livermorium.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.86 ppm",
      "ocean": "0.086 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "JINR Dubna & LLNL",
      "year": 2000,
      "country": "Nga / Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Ts",
    "atomicNumber": 117,
    "nameEn": "Tennessine",
    "nameVi": "Tennessin",
    "nameLatin": "Tennessine",
    "casNumber": "87676-22-8",
    "pubchemCid": 23959,
    "etymology": "Đặt tên theo tiếng Latin \"Tennessine\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 17,
    "groupTraditional": "VIIA",
    "block": "p",
    "mainCategory": "nonmetal",
    "subCategory": "halogen",
    "subCategoryNameVi": "Halogen",
    "atomicMass": 294,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      18,
      7
    ],
    "valenceElectrons": 7,
    "atomicRadiusEmpirical": 137,
    "covalentRadius": 147,
    "ionicRadius": "Ts⁺ / Ts²⁺: ~70 pm",
    "vanDerWaalsRadius": 217,
    "isotopes": [
      {
        "name": "^294Ts",
        "mass": 294,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "7.2 g/cm³",
    "meltingPointC": 450,
    "boilingPointC": 610,
    "meltingPointK": 723.15,
    "boilingPointK": 883.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      742.9
    ],
    "electronAffinity": "—",
    "oxidationStates": [
      -1,
      1,
      3,
      5
    ],
    "commonOxidationStates": [
      -1,
      1
    ],
    "reactivity": {
      "withOxygen": "Phản ứng với oxy ở nhiệt độ thích hợp tạo oxit tương ứng (TsO_x).",
      "withChlorine": "Tác dụng với khí clo tạo muối clorua (TsCl_x).",
      "withHydrogen": "Phản ứng tạo hợp chất hiđrua tương ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Bị oxi hóa bởi axit có tính oxi hóa mạnh.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Oxit axit; axit tương ứng có tính axit từ yếu đến rất mạnh.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Tennessine.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.85 ppm",
      "ocean": "0.085 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "JINR, LLNL & Oak Ridge",
      "year": 2010,
      "country": "Nga / Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  },
  {
    "symbol": "Og",
    "atomicNumber": 118,
    "nameEn": "Oganesson",
    "nameVi": "Oganexon",
    "nameLatin": "Oganesson",
    "casNumber": "54144-19-3",
    "pubchemCid": 23936,
    "etymology": "Đặt tên theo tiếng Latin \"Oganesson\" hoặc vinh danh nhà khoa học/địa danh khám phá.",
    "period": 7,
    "group": 18,
    "groupTraditional": "VIIIA",
    "block": "p",
    "mainCategory": "noble_gas",
    "subCategory": "noble_gas",
    "subCategoryNameVi": "Khí hiếm",
    "atomicMass": 294,
    "electronConfigFull": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    "electronConfigShort": "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    "energyLevels": [
      2,
      8,
      18,
      32,
      32,
      18,
      8
    ],
    "valenceElectrons": 0,
    "atomicRadiusEmpirical": 138,
    "covalentRadius": 148,
    "ionicRadius": "Og⁺ / Og²⁺: ~70 pm",
    "vanDerWaalsRadius": 218,
    "isotopes": [
      {
        "name": "^294Og",
        "mass": 294,
        "isStable": false,
        "halfLife": "Phóng xạ",
        "decayMode": "α / β⁻"
      }
    ],
    "standardState": "solid",
    "appearance": "Đơn chất phi kim, trạng thái solid",
    "density": "5.0 g/cm³",
    "meltingPointC": 50,
    "boilingPointC": 80,
    "meltingPointK": 323.15,
    "boilingPointK": 353.15,
    "heatOfFusion": "—",
    "heatOfVaporization": "—",
    "molarHeatCapacity": "0.45 J/(g·K)",
    "electricalConductivity": "Cách điện",
    "electricalResistivity": "Cao",
    "thermalConductivity": 0.5,
    "crystalStructure": "Phân tử",
    "crystalStructureVi": "Mạng phân tử",
    "magnetism": "Nghịch từ (Diamagnetic)",
    "speedOfSound": 3000,
    "ionizationEnergies": [
      860.1
    ],
    "electronAffinity": 5.4,
    "oxidationStates": [
      0,
      2,
      4
    ],
    "commonOxidationStates": [
      0
    ],
    "reactivity": {
      "withOxygen": "Hoàn toàn trơ hóa học với oxy.",
      "withChlorine": "Không phản ứng.",
      "withHydrogen": "Không phản ứng.",
      "withWater": "Ít tan và ít tác dụng với nước.",
      "withAcids": "Không tác dụng.",
      "withBases": "Bền vững với dung dịch kiềm ở điều kiện thường."
    },
    "oxideHydroxideProperties": "Không tạo oxit và hydroxit bền.",
    "emissionLinesSummary": "Vạch quang phổ phát xạ đặc trưng vùng tử ngoại và khả kiến của nguyên tố Oganesson.",
    "flameTestColor": "Không rõ",
    "flameTestHex": "#cbd5e1",
    "abundance": {
      "crust": "0.85 ppm",
      "ocean": "0.085 ppb",
      "atmosphere": "Vết",
      "humanBody": "Dạng vết",
      "solarSystem": "Dạng vết"
    },
    "mineralogy": "Tồn tại dưới dạng khoáng vật oxit, sunfua, silicat hoặc tổng hợp nhân tạo trong máy gia tốc.",
    "productionMethod": "Tổng hợp nhân tạo qua phản ứng bắn phá hạt nhân trong máy gia tốc.",
    "industrialApplications": [
      "Ứng dụng trong nghiên cứu khoa học và tổng hợp vật liệu mới",
      "Công nghệ cao, hợp kim chuyên dụng và chế tạo linh kiện",
      "Ứng dụng trong y học phóng xạ hoặc ngành năng lượng"
    ],
    "biologicalRole": "Đồng vị phóng xạ, không có vai trò sinh học tự nhiên, độc hại với tế bào do bức xạ ion hóa.",
    "nfpa704": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "special": "RAD"
    },
    "ghsClassification": [
      "Nguy hại phóng xạ",
      "Độc hại nếu nuốt phải (H301)"
    ],
    "ghsPictograms": [
      "health_hazard",
      "harmful"
    ],
    "toxicityNotes": "Chất phóng xạ nguy hiểm; độc tính tế bào do phát xạ alpha/beta/gamma làm ion hóa mô sống.",
    "discoveryHistory": {
      "discoverer": "JINR Dubna & LLNL (vinh danh Yuri Oganessian)",
      "year": 2002,
      "country": "Nga / Mỹ",
      "description": "Được phát hiện và nghiên cứu tính chất hóa học thực nghiệm."
    }
  }
];

export const PERIODIC_GRID_POSITIONS: Record<number, { row: number; col: number }> = {
  1: { row: 1, col: 1 }, 2: { row: 1, col: 18 },
  3: { row: 2, col: 1 }, 4: { row: 2, col: 2 }, 5: { row: 2, col: 13 }, 6: { row: 2, col: 14 }, 7: { row: 2, col: 15 }, 8: { row: 2, col: 16 }, 9: { row: 2, col: 17 }, 10: { row: 2, col: 18 },
  11: { row: 3, col: 1 }, 12: { row: 3, col: 2 }, 13: { row: 3, col: 13 }, 14: { row: 3, col: 14 }, 15: { row: 3, col: 15 }, 16: { row: 3, col: 16 }, 17: { row: 3, col: 17 }, 18: { row: 3, col: 18 },
  19: { row: 4, col: 1 }, 20: { row: 4, col: 2 }, 21: { row: 4, col: 3 }, 22: { row: 4, col: 4 }, 23: { row: 4, col: 5 }, 24: { row: 4, col: 6 }, 25: { row: 4, col: 7 }, 26: { row: 4, col: 8 }, 27: { row: 4, col: 9 }, 28: { row: 4, col: 10 }, 29: { row: 4, col: 11 }, 30: { row: 4, col: 12 }, 31: { row: 4, col: 13 }, 32: { row: 4, col: 14 }, 33: { row: 4, col: 15 }, 34: { row: 4, col: 16 }, 35: { row: 4, col: 17 }, 36: { row: 4, col: 18 },
  37: { row: 5, col: 1 }, 38: { row: 5, col: 2 }, 39: { row: 5, col: 3 }, 40: { row: 5, col: 4 }, 41: { row: 5, col: 5 }, 42: { row: 5, col: 6 }, 43: { row: 5, col: 7 }, 44: { row: 5, col: 8 }, 45: { row: 5, col: 9 }, 46: { row: 5, col: 10 }, 47: { row: 5, col: 11 }, 48: { row: 5, col: 12 }, 49: { row: 5, col: 13 }, 50: { row: 5, col: 14 }, 51: { row: 5, col: 15 }, 52: { row: 5, col: 16 }, 53: { row: 5, col: 17 }, 54: { row: 5, col: 18 },
  55: { row: 6, col: 1 }, 56: { row: 6, col: 2 },
  72: { row: 6, col: 4 }, 73: { row: 6, col: 5 }, 74: { row: 6, col: 6 }, 75: { row: 6, col: 7 }, 76: { row: 6, col: 8 }, 77: { row: 6, col: 9 }, 78: { row: 6, col: 10 }, 79: { row: 6, col: 11 }, 80: { row: 6, col: 12 }, 81: { row: 6, col: 13 }, 82: { row: 6, col: 14 }, 83: { row: 6, col: 15 }, 84: { row: 6, col: 16 }, 85: { row: 6, col: 17 }, 86: { row: 6, col: 18 },
  87: { row: 7, col: 1 }, 88: { row: 7, col: 2 },
  104: { row: 7, col: 4 }, 105: { row: 7, col: 5 }, 106: { row: 7, col: 6 }, 107: { row: 7, col: 7 }, 108: { row: 7, col: 8 }, 109: { row: 7, col: 9 }, 110: { row: 7, col: 10 }, 111: { row: 7, col: 11 }, 112: { row: 7, col: 12 }, 113: { row: 7, col: 13 }, 114: { row: 7, col: 14 }, 115: { row: 7, col: 15 }, 116: { row: 7, col: 16 }, 117: { row: 7, col: 17 }, 118: { row: 7, col: 18 },
  // Lanthanoids (row 9, col 4 to 18)
  57: { row: 9, col: 4 }, 58: { row: 9, col: 5 }, 59: { row: 9, col: 6 }, 60: { row: 9, col: 7 }, 61: { row: 9, col: 8 }, 62: { row: 9, col: 9 }, 63: { row: 9, col: 10 }, 64: { row: 9, col: 11 }, 65: { row: 9, col: 12 }, 66: { row: 9, col: 13 }, 67: { row: 9, col: 14 }, 68: { row: 9, col: 15 }, 69: { row: 9, col: 16 }, 70: { row: 9, col: 17 }, 71: { row: 9, col: 18 },
  // Actinoids (row 10, col 4 to 18)
  89: { row: 10, col: 4 }, 90: { row: 10, col: 5 }, 91: { row: 10, col: 6 }, 92: { row: 10, col: 7 }, 93: { row: 10, col: 8 }, 94: { row: 10, col: 9 }, 95: { row: 10, col: 10 }, 96: { row: 10, col: 11 }, 97: { row: 10, col: 12 }, 98: { row: 10, col: 13 }, 99: { row: 10, col: 14 }, 100: { row: 10, col: 15 }, 101: { row: 10, col: 16 }, 102: { row: 10, col: 17 }, 103: { row: 10, col: 18 },
};

export function getElementBySymbol(symbol: string): ChemicalElement | undefined {
  return ELEMENTS_DATA.find(el => el.symbol.toLowerCase() === symbol.toLowerCase());
}

export function getElementByAtomicNumber(z: number): ChemicalElement | undefined {
  return ELEMENTS_DATA.find(el => el.atomicNumber === z);
}

export function searchElements(query: string): ChemicalElement[] {
  if (!query || !query.trim()) return ELEMENTS_DATA;
  const q = query.trim().toLowerCase();
  
  return ELEMENTS_DATA.filter(el => {
    return (
      el.symbol.toLowerCase().includes(q) ||
      el.nameEn.toLowerCase().includes(q) ||
      el.nameVi.toLowerCase().includes(q) ||
      el.nameLatin.toLowerCase().includes(q) ||
      el.atomicNumber.toString() === q ||
      el.casNumber.toLowerCase().includes(q) ||
      el.pubchemCid.toString().includes(q) ||
      el.groupTraditional.toLowerCase().includes(q) ||
      el.subCategoryNameVi.toLowerCase().includes(q) ||
      el.electronConfigShort.toLowerCase().includes(q)
    );
  });
}
