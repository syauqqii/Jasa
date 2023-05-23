const { test, expect } = require('@playwright/test')

// Jumlah request sebanyak x kali
const JUMLAH_REQUEST = 1000
const LINK_GOOGLE_FORM = ''

// [1]
const i1 = [1, 2]

// [2]
const i2 = [5, 6, 7, 8, 9]

// [3]
const i3 = [10, 11]

// [5]
const i4 = [0, 1, 2, 3, 4]

// [7]
const i6 = [5, 6, 7]

// [10]
const i7 = [0, 1]

// [12]
const i8 = [0, 1, 2, 3, 4]

// [14]
const i10 = [5, 6, 7]

test('Spammer Google Questioner', async ({ page }) => {
	console.log(`\n [ # ] ----- [ Spammer Google Questioner ] ----- [ # ]\n`)

	let r1 = 0
	let r2 = 0
	let r3 = 0
	let r4 = 0
	let r5 = 0
	let r6 = 0
	let r7 = 0
	let r8 = 0
	let r9 = 0
	let r10 = 0

	for(let i=0; i<JUMLAH_REQUEST; i++){
		let date = new Date()
		let hours   = date.getHours()
		let minutes = date.getMinutes()
		let seconds = date.getSeconds()

		r1 = Math.floor(Math.random() * i1.length)
		r2 = Math.floor(Math.random() * i2.length)
		r3 = Math.floor(Math.random() * i3.length)
		r4 = Math.floor(Math.random() * i4.length)

		r5 = Math.floor(Math.random() * 2) + 1
		let checkBox = []

		r6 = Math.floor(Math.random() * i6.length)
		r7 = Math.floor(Math.random() * i7.length)
		r8 = Math.floor(Math.random() * i8.length)

		r9 = Math.floor(Math.random() * 2) + 1
		let checkBox2 = []

		r10 = Math.floor(Math.random() * i10.length)

		await page.goto(LINK_GOOGLE_FORM)

		// ----------------------------------- [ PAGE 1 ] ----------------------------------------
		// [1] Masukkan range usia anda [0..4] => 1 / 2
		await page.locator('div[class="vd3tt"]').nth(i1[r1]).click()
		// [2] Seberapa familiar Anda dengan teknologi image recognition dan speech recognition berbasis AI? [5..9]
		await page.locator('div[class="vd3tt"]').nth(i2[r2]).click()
		// [3] Apakah anda pernah mencoba fitur Image Recognition? [10..11] (10 -> iya, 11 -> tidak)
		await page.locator('div[class="vd3tt"]').nth(i3[r3]).click()
		// [4] Berikutnya
		await page.locator('span[class="l4V7wb Fxmcue"]').nth(0).click()

		// Jika PAGE-1 -> iya (10)
		if(i3[r3] == 10){
			// ----------------------------------- [ PAGE 2 ] ----------------------------------------
			// [5] Seberapa efektif menurut Anda sistem image recognition berbasis AI dalam mengidentifikasi dan mengategorikan objek atau fitur dalam gambar secara akurat?
			await page.locator('div[class="vd3tt"]').nth(i4[r4]).click()
			// [6] Sistem atau aplikasi image recognition berbasis AI apa yang Anda kenal dibawah ini?
			while(checkBox.length < r5){
				const index = Math.floor(Math.random()*3);
				if(!checkBox.includes(index)){
					checkBox.push(index);
				}
		    }
		    for(const index of checkBox){
				await page.locator('div[class="uVccjd aiSeRd FXLARc wGQFbe BJHAP oLlshd"]').nth(index).click();
		    }
			// [7] Dari pilihan dibawah,image recognition apa yang paling sering anda pakai? 
			await page.locator('div[class="vd3tt"]').nth(i6[r6]).click()
			// [8] Mengapa anda paling sering memakai pilihan aplikasi tersebut? 
			await page.locator('textarea[class="KHxj8b tL9Q4c"]').nth(1).fill('Sangat Bermanfaat Sekali')
			// [9] Berikutnya
			await page.locator('span[class="l4V7wb Fxmcue"]').nth(2).click()
			
			// ----------------------------------- [ PAGE 3 ] ----------------------------------------
			// [10] Apakah anda pernah mencoba fitur Speech Recognition?
			await page.locator('div[class="vd3tt"]').nth(i7[r7]).click()

			// [11] Berikutnya
			await page.locator('span[class="l4V7wb Fxmcue"]').nth(1).click()

			// Jika PAGE-3 -> iya (0)
			if(i7[r7] == 0){
				// ----------------------------------- [ PAGE 4 ] ----------------------------------------
				// [12] Seberapa efektif menurut Anda sistem speech recognition berbasis AI dalam mengidentifikasi dan mengategorikan objek atau fitur dalam gambar secara akurat?
				await page.locator('div[class="vd3tt"]').nth(i8[r8]).click()
				// [13] Sistem atau aplikasi speech recognition berbasis AI apa yang Anda kenal dibawah ini?
				while(checkBox2.length < r9){
					const index = Math.floor(Math.random()*3);
					if(!checkBox2.includes(index)){
						checkBox2.push(index);
					}
			    }
			    for(const index of checkBox2){
					await page.locator('div[class="uVccjd aiSeRd FXLARc wGQFbe BJHAP oLlshd"]').nth(index).click();
			    }
				// [14] Dari pilihan dibawah,speech recognition apa yang paling sering anda pakai?
				await page.locator('div[class="vd3tt"]').nth(i10[r10]).click()
				// [15] Kirim
				await page.locator('span[class="l4V7wb Fxmcue"]').nth(2).click()

				await page.waitForSelector('div[class="vHW8K"]')
				console.log(` [${hours}:${minutes}:${seconds}] Data berhasil dikirim : Kondisi 1 (iya -> iya)`)
			} // Jika PAGE-3 -> tidak (1)
			else{
				// [16] Kirim
				await page.locator('span[class="l4V7wb Fxmcue"]').nth(1).click()

				await page.waitForSelector('div[class="vHW8K"]')
				console.log(` [${hours}:${minutes}:${seconds}] Data berhasil dikirim : Kondisi 2 (iya -> tidak)`)
			}
		} // Jika PAGE-1 -> tidak (11)
		else{
			// ----------------------------------- [ PAGE 3 ] ----------------------------------------
			// [10] Apakah anda pernah mencoba fitur Speech Recognition?
			await page.locator('div[class="vd3tt"]').nth(i7[r7]).click()

			// [11] Berikutnya
			await page.locator('span[class="l4V7wb Fxmcue"]').nth(1).click()

			// Jika PAGE-3 -> iya (0)
			if(i7[r7] == 0){
				// ----------------------------------- [ PAGE 4 ] ----------------------------------------
				// [12] Seberapa efektif menurut Anda sistem speech recognition berbasis AI dalam mengidentifikasi dan mengategorikan objek atau fitur dalam gambar secara akurat?
				await page.locator('div[class="vd3tt"]').nth(i8[r8]).click()
				// [13] Sistem atau aplikasi speech recognition berbasis AI apa yang Anda kenal dibawah ini?
				while(checkBox2.length < r9){
					const index = Math.floor(Math.random()*3);
					if(!checkBox2.includes(index)){
						checkBox2.push(index);
					}
			    }
			    for(const index of checkBox2){
					await page.locator('div[class="uVccjd aiSeRd FXLARc wGQFbe BJHAP oLlshd"]').nth(index).click();
			    }
				// [14] Dari pilihan dibawah,speech recognition apa yang paling sering anda pakai?
				await page.locator('div[class="vd3tt"]').nth(i10[r10]).click()
				// [15] Kirim
				await page.locator('span[class="l4V7wb Fxmcue"]').nth(2).click()

				await page.waitForSelector('div[class="vHW8K"]')
				console.log(` [${hours}:${minutes}:${seconds}] Data berhasil dikirim : Kondisi 3 (tidak -> iya)`)
			} // Jika PAGE-3 -> tidak (1)
			else{
				// [16] Kirim
				await page.locator('span[class="l4V7wb Fxmcue"]').nth(1).click()

				await page.waitForSelector('div[class="vHW8K"]')
				console.log(` [${hours}:${minutes}:${seconds}] Data berhasil dikirim : Kondisi 4 (tidak -> tidak)`)
			}
		}

		await page.locator('')
	}
})