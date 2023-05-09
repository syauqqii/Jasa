const { test, expect } = require('@playwright/test');

const url = "";
const jumlahData = 100;

const namaDepan    = ["Agung", "Abyasa", "Abimanyu", "Bakti", "Batara", "Bayu", "Budi", "Dharma", "Dirga", "Gema", "Rahardian", "Raka", "Rafael"];
const namaBelakang = ['Agra', 'Farrel', 'Bowen', 'Wilson', 'Danish', 'Zane', 'Nasir', 'Adnan', 'Alfian', 'Anas', 'Arion', 'Ariston', 'Axel'];
const checkBox     = [0, 1, 2, 3];

const q1index = [0, 1, 2, 3, 4];
const q2index = [5, 6, 7, 8, 9];
const q3index = [10, 11, 12, 13, 14];

test('Auto Fill Google Form BOT', async ({ page }) => {
  // Declare Nama + Email LOGIC
  let indexNamaDepan = 0;
  let indexNamaBelakang = 0;
  let namaUser  = " ";
  let emailUser = " ";

  // CheckBOX LOGIC
  let maxCentang = 0;

  // Logic Radio Button
  let q1rand = 0;
  let q2rand = 0;
  let q3rand = 0;

  for(let i=0; i<jumlahData; i++){
    // Nama + Email LOGIC 1
    indexNamaDepan    = Math.floor(Math.random()*namaDepan.length);
    indexNamaBelakang = Math.floor(Math.random()*namaBelakang.length);

    namaUser  = namaDepan[indexNamaDepan]+" "+namaBelakang[indexNamaBelakang];
    emailUser = namaBelakang[indexNamaBelakang]+namaDepan[indexNamaDepan]+indexNamaDepan+indexNamaBelakang+"@gmail.com"
    // END LOGIC 1

    // Check BOX LOGIC 2
    maxCentang = Math.floor(Math.random()*2) + 1;
    let checkBoxIndex = [];
    // END LOGIC 2

    // Radio Button LOGIC 3
    q1rand = Math.floor(Math.random()*q1index.length);
    q2rand = Math.floor(Math.random()*q2index.length);
    q3rand = Math.floor(Math.random()*q3index.length);
    // END LOGIC 3

    // Otw ke URL
    await page.goto(url);

    // input block-1: nama
    const nama = page.locator('input[class="whsOnd zHQkBf"]').nth(0);
    await nama.fill(namaUser);

    // input block-2: email
    const email = page.locator('input[class="whsOnd zHQkBf"]').nth(1);
    await email.fill(emailUser);

    // input block-3: level education [sma{0}, univ{1}] => 1 fix
    const eduLevel = page.locator('div[class="AB7Lab Id5V1"]').nth(1);
    await eduLevel.click();
    
    // input block-4: learning material [once{2}, never{3}] => 0 fix
    const learnMat = page.locator('div[class="AB7Lab Id5V1"]').nth(2);
    await learnMat.click();

    // input block-5: btnNext [berikutnya{0}, reset{1}]
    const btnNext = page.locator('span[class="NPEfkd RveJvd snByac"]').nth(0);
    await btnNext.click();

    // ===================================================
    //            wait for selector
    // ===================================================
    await page.waitForSelector('div[class="uHMk6b fsHoPb"]');
    // ===================================================

    // input block-6: checkbox [video{0}, text{1}, zoom{2}, audio{3}, lain{4}]
    while(checkBoxIndex.length < maxCentang){
      const index = Math.floor(Math.random()*3);
      if(!checkBoxIndex.includes(index)){
        checkBoxIndex.push(index);
      }
    }

    for(const index of checkBoxIndex){
      await page.locator('div[class="uHMk6b fsHoPb"]').nth(index).click();
    }

    // input block-7: question1 [1{0}, 2{1}, 3{2}, 4{3}, 5{4}]
    const q1 = page.locator('div[class="AB7Lab Id5V1"]').nth(q1index[q1rand]);
    await q1.click();

    // input block-8: question1 [1{5}, 2{6}, 3{7}, 4{8}, 5{9}]
    const q2 = page.locator('div[class="AB7Lab Id5V1"]').nth(q2index[q2rand]);
    await q2.click();

    // input block-9: question1 [1{10}, 2{11}, 3{12}, 4{13}, 5{14}]
    const q3 = page.locator('div[class="AB7Lab Id5V1"]').nth(q3index[q3rand]);
    await q3.click();

    // input block-10: textarea 
    const txtArea1 = page.locator('div[class="Pc9Gce Wic03c"] textarea').nth(0);
    await txtArea1.fill('-');

    // input block-11: textarea 
    const txtArea2 = page.locator('div[class="Pc9Gce Wic03c"] textarea').nth(1);
    await txtArea2.fill('-');

    // button submit [back{0}, submit{1}, reset{2}]
    const submit = page.locator('span[class="NPEfkd RveJvd snByac"]').nth(1);
    await submit.click();

    // Log console -> nama+email
    await console.log(" > Berhasil Mengirim Data ke-"+(i+1)+" | Nama: "+namaUser+" | Email: "+emailUser);
  }
});