function updateRealTime() {
    const now = new Date();

    const timeString = now.toLocaleTimeString('th-TH', { 
        timeZone: 'Asia/Bangkok', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });

    const dateString = now.toLocaleDateString('en-US', { 
        timeZone: 'Asia/Bangkok', 
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    document.querySelectorAll(".real-time").forEach(el => {
        el.innerText = timeString;
    });

    const dateEl = document.getElementById("real-date");
    if (dateEl) {
        dateEl.innerText = dateString;
    }
}

updateRealTime();
setInterval(updateRealTime, 1000);

let currentPasscode = "";
const correctPasscode = "2118";

function showPasscodeScreen() {
    document.getElementById("lock-screen").classList.add("hidden");
    document.getElementById("passcode-screen").classList.remove("hidden");
}

function pressNum(num) {
    if (currentPasscode.length < 4) {
        currentPasscode += num;
        updateDots();
    }

    if (currentPasscode.length === 4) {
        setTimeout(() => {
            if (currentPasscode === correctPasscode) {
                document.getElementById("passcode-screen").classList.add("hidden");
                document.getElementById("home-screen").classList.remove("hidden");
            } else {
                alert("รหัสผ่านไม่ถูกต้อง! (ลองใส่ 2118)");
                currentPasscode = "";
                updateDots();
            }
        }, 200);
    }
}

function clearNum() {
    currentPasscode = currentPasscode.slice(0, -1);
    updateDots();
}

function updateDots() {
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (i < currentPasscode.length) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    }
}

let startY = 0;
let isDragging = false;

function startDrag(e) {
    isDragging = true;
    startY = e.clientY || e.touches[0].clientY;
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
}

function onDrag(e) {
    if (!isDragging) return;
    const currentY = e.clientY || e.touches[0].clientY;
    const diffY = startY - currentY;
    if (diffY > 50) {
        endDrag();
        showPasscodeScreen();
    }
}

function endDrag() {
    isDragging = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('mouseup', endDrag);
    window.removeEventListener('touchend', endDrag);
}

function openApp(appName) {
    document.getElementById("home-screen").classList.add("hidden");
    
    if (appName === 'locket') {
        document.getElementById("locket-app-screen").classList.remove("hidden");
    } else if (appName === 'photos') {
        document.getElementById("photos-app-screen").classList.remove("hidden");
    } else if (appName === 'clock') {
        document.getElementById("clock-app-screen").classList.remove("hidden");
    } else if (appName === 'notes') {
        document.getElementById("notes-app-screen").classList.remove("hidden");
    } else if (appName === 'calendar') {
        document.getElementById("home-screen").classList.remove("hidden");
    } else if (appName === 'line') {
        document.getElementById("line-app-screen").classList.remove("hidden");
    }
}

function switchPhotosTab(tabName) {
    document.getElementById("photos-album-detail").classList.add("hidden");
    document.getElementById("photos-tab-library").classList.add("hidden");
    document.getElementById("photos-tab-collections").classList.add("hidden");

    document.getElementById("tab-btn-library").classList.remove("active");
    document.getElementById("tab-btn-collections").classList.remove("active");

    if (tabName === 'library') {
        document.getElementById("photos-tab-library").classList.remove("hidden");
        document.getElementById("tab-btn-library").classList.add("active");
    } else if (tabName === 'collections') {
        document.getElementById("photos-tab-collections").classList.remove("hidden");
        document.getElementById("tab-btn-collections").classList.add("active");
    }
}

function renderRealCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const todayDate = now.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const monthYearEl = document.getElementById("cal-month-year");
    if (monthYearEl) {
        monthYearEl.innerText = `${monthNames[month]} ${year}`;
    }

    const gridEl = document.getElementById("cal-days-grid");
    if (!gridEl) return;

    const headersHTML = `
        <span class="cal-day-name">อา</span>
        <span class="cal-day-name">จ</span>
        <span class="cal-day-name">อ</span>
        <span class="cal-day-name">พ</span>
        <span class="cal-day-name">พ</span>
        <span class="cal-day-name">ศ</span>
        <span class="cal-day-name">ส</span>
    `;
    
    let daysHTML = headersHTML;
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        daysHTML += `<span></span>`;
    }

    for (let day = 1; day <= totalDays; day++) {
        if (day === todayDate) {
            daysHTML += `<span class="today">${day}</span>`;
        } else {
            daysHTML += `<span>${day}</span>`;
        }
    }

    gridEl.innerHTML = daysHTML;
}

window.addEventListener("DOMContentLoaded", () => {
    renderRealCalendar();
});

function openPhotoViewer(element) {
    const imgElement = element.querySelector("img");
    if (!imgElement) return;

    document.getElementById("expanded-img").src = imgElement.src;
    document.getElementById("photo-viewer-screen").classList.remove("hidden");
}

function closePhotoViewer() {
    document.getElementById("photo-viewer-screen").classList.add("hidden");
}

function openAlbumDetail() {
    document.getElementById("photos-album-detail").classList.remove("hidden");
}

function closeAlbumDetail() {
    document.getElementById("photos-album-detail").classList.add("hidden");
}

function updateClockIcon() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = (minutes * 6);
    const secondDeg = (seconds * 6);

    const hourHand = document.getElementById("hour-hand");
    const minuteHand = document.getElementById("minute-hand");
    const secondHand = document.getElementById("second-hand");

    if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    if (secondHand) secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

setInterval(updateClockIcon, 1000);
updateClockIcon();

function toggleAlarm(element) {
    element.classList.toggle("active");
}

function openNoteDetail(title, content, dateStr) {
    document.getElementById("notes-list-view").classList.add("hidden");
    document.getElementById("notes-detail-view").classList.remove("hidden");
    
    document.getElementById("detail-title").innerText = title;
    document.getElementById("detail-body").innerHTML = content;
    document.getElementById("detail-date").innerText = dateStr;
}

function closeNoteDetail() {
    document.getElementById("notes-detail-view").classList.add("hidden");
    document.getElementById("notes-list-view").classList.remove("hidden");
}

function openYouTubeApp() {
    window.open('https://www.youtube.com/@LNGSHOT4SHO/videos', '_blank');
}

function closeLocketApp() {
    document.getElementById("locket-app-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
}

function closePhotosApp() {
    document.getElementById("photos-app-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
}

function closeClockApp() {
    document.getElementById("clock-app-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
}

function closeNotesApp() {
    document.getElementById("notes-app-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
}

function closeLineApp() {
    document.getElementById("line-app-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
}

// 💬 ระบบจัดการห้องแชทและข้อความสำเร็จรูป
const replyScenarios = [
    "เค้าขอโทษนะคนดี เดี๋ยวรีบเคลียร์แล้วโทรหาทันทีเลยครับ 💖",
    "งือ อย่าเพิ่งโกรธน้า เดี๋ยววันนี้พาไปกินชาบูร้านโปรดเลย 🥩",
    "รักมี่ที่สุดในโลกเลยครับ สัญญาจะไม่หายไปไหนอีกแล้ว 🥺",
    "ดีกันน้าคนสวย เดี๋ยวเค้าซื้อชานมไข่มุกไปฝาก 🧋"
];
let currentScenarioIndex = 0;

function openChatRoom() {
    document.getElementById("line-app-screen").classList.add("hidden");
    document.getElementById("line-chat-room-screen").classList.remove("hidden");
    document.getElementById("line-unread-badge").style.display = "none";
    document.getElementById("quick-reply-bar").classList.remove("show");
    setTimeout(() => { const el = document.getElementById("amy-extra-2"); if (el) el.style.display = "flex"; scrollToBottom('chat-messages-container'); }, 600);
    
    // ตั้งเวลาปัจจุบันเป็นคำว่า "Today" พร้อมเวลาจริง
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    const dateEl = document.getElementById("chat-today-date");
    if (dateEl) {
        dateEl.innerText = `Today ${timeString}`;
    }

    // ปิดแถบ Quick Reply ไว้ก่อนตอนเปิดห้องแชท
    const quickBar = document.getElementById("quick-reply-bar");
    if (quickBar) quickBar.classList.remove("show");

    // ดีเลย์จำลองข้อความเอมี่เด้งรัวๆ 5 ข้อความเหมือนคนกำลังงอน
    setTimeout(() => { 
        const el = document.getElementById("amy-extra-2");
        if (el) el.style.display = "flex"; 
        scrollToBottom(); 
    }, 600);
    setTimeout(() => { 
        const el = document.getElementById("amy-extra-3");
        if (el) el.style.display = "flex"; 
        scrollToBottom(); 
    }, 1200);
    setTimeout(() => { 
        const el = document.getElementById("amy-extra-4");
        if (el) el.style.display = "flex"; 
        scrollToBottom(); 
    }, 1800);
    setTimeout(() => { 
        const el = document.getElementById("amy-extra-5");
        if (el) el.style.display = "flex"; 
        scrollToBottom(); 
    }, 2400);
}

function closeChatRoom() {
    document.getElementById("line-chat-room-screen").classList.add("hidden");
    document.getElementById("line-app-screen").classList.remove("hidden");
    const quickBar = document.getElementById("quick-reply-bar");
    if (quickBar) quickBar.classList.remove("show");
}

// เปิด/ปิด แถบข้อความสำเร็จรูป (กดซ้ำแล้วปิด)
function toggleQuickReplies() {
    const bar = document.getElementById("quick-reply-bar");
    if (bar) {
        bar.classList.toggle("show");
        scrollToBottom();
    }
}

// กดเลือกข้อความสำเร็จรูปเพื่อส่งทันที (เอมี่จะตอบกลับตามข้อความที่เราเลือก)
function sendSpecificMessage(text) {
    const container = document.getElementById("chat-messages-container");
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });

    // 1. ซ่อนกล่องข้อความสำเร็จรูปทันทีที่กดเลือก
    const quickBar = document.getElementById("quick-reply-bar");
    if (quickBar) {
        quickBar.classList.remove("show");
    }

    // 2. เคลียร์ตัวเลขแจ้งเตือน (Badge สีแดง) ที่หน้าแชทหลัก
    const badgeEl = document.getElementById("line-unread-badge");
    if (badgeEl) {
        badgeEl.style.display = "none";
    }

    // 3. อัปเดตข้อความพรีวิวและเวลาล่าสุดที่หน้าลิสต์แชทหลัก
    const lastMsgEl = document.getElementById("line-last-msg");
    const lastTimeEl = document.getElementById("line-last-time");
    if (lastMsgEl) {
        lastMsgEl.innerText = text;
        lastMsgEl.style.color = "#000000";
    }
    if (lastTimeEl) {
        lastTimeEl.innerText = timeString;
    }

    // 4. สร้างบับเบิ้ลข้อความฝั่งเรา (สีเขียว) ในห้องแชท
    const sentRow = document.createElement("div");
    sentRow.className = "classic-msg-row sent";
    sentRow.innerHTML = `
        <div class="classic-msg-content sent-content">
            <div class="classic-read-time">
                <span class="read-status">อ่านแล้ว</span>
                <span class="classic-msg-time">${timeString}</span>
            </div>
            <div class="classic-bubble sent-bubble">${text}</div>
        </div>
    `;
    container.appendChild(sentRow);
    scrollToBottom();

    // 5. 🌟 กำหนดคำตอบของเอมี่ให้ต่างกันตามข้อความที่เราเลือกส่ง
    let amyReplyText = "ดีมาก! ให้อภัยก็ได้ ห้ามทำอีกนะรู้ไหม 😤💕"; // ค่าเริ่มต้น

    if (text.includes("ชาบู")) {
        amyReplyText = "หูยยย รู้ใจ! งั้นเย็นนี้เจอกันที่ร้านเดิมนะ ห้ามเบี้ยวด้วย 🥩😋";
    } else if (text.includes("ชานมไข่มุก")) {
        amyReplyText = "เอาชานมไข่มุกมาล่อหรอ... 🧋 หึ! แต่เห็นแก่ความพยายามหรอกนะ ให้อภัยก็ได้ 😉";
    } else if (text.includes("รีบเคลียร์อยู่")) {
        amyReplyText = "โอเค รีบเคลียร์ให้เสร็จล่ะ ห้ามหายไปนานอีกนะ เข้าใจไหมพุดดิ้ง 👀";
    } else if (text.includes("รักมี่ที่สุด")) {
        amyReplyText = "พูดจาหวานหูตลอดเลยนะ คนอะไรก็ไม่รู้... เขินนะเนี่ยพุดดิ้งพุ้ยพุ้ย 🥰";
    }

    // 6. จำลองเอมี่พิมพ์ตอบกลับมาตามเงื่อนไขด้านบน
    setTimeout(() => {
        const replyRow = document.createElement("div");
        replyRow.className = "classic-msg-row received";
        replyRow.innerHTML = `
            <div class="classic-msg-avatar"><img src="images/ล็อกเก็ต.jpg" alt="เอมี่"></div>
            <div class="classic-msg-content">
                <span class="classic-sender-name">เอมี่</span>
                <div class="classic-bubble-wrap">
                    <div class="classic-bubble">${amyReplyText}</div>
                    <span class="classic-msg-time">${timeString}</span>
                </div>
            </div>
        `;
        container.appendChild(replyRow);
        scrollToBottom();

        // อัปเดตข้อความล่าสุดหน้าหลักให้เป็นคำตอบของเอมี่
        if (lastMsgEl) {
            lastMsgEl.innerText = amyReplyText;
        }
    }, 1500);
}

function scrollToBottom() {
    const scrollContainer = document.getElementById("chat-messages-container");
    if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
}

// ================= แชทที่ 2: หลุยส์ =================
function openLouisChatRoom() {
    document.getElementById("line-app-screen").classList.add("hidden");
    document.getElementById("louis-chat-room-screen").classList.remove("hidden");
    document.getElementById("louis-unread-badge").style.display = "none";
    document.getElementById("louis-quick-reply-bar").classList.remove("show");
    setTimeout(() => { const el = document.getElementById("louis-extra-2"); if (el) el.style.display = "flex"; scrollToBottom('louis-messages-container'); }, 600);
}
function closeLouisChatRoom() {
    document.getElementById("louis-chat-room-screen").classList.add("hidden");
    document.getElementById("line-app-screen").classList.remove("hidden");
}
function toggleLouisQuickReplies() { document.getElementById("louis-quick-reply-bar").classList.toggle("show"); scrollToBottom('louis-messages-container'); }
function sendLouisMessage(text) {
    const container = document.getElementById("louis-messages-container");
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    document.getElementById("louis-quick-reply-bar").classList.remove("show");
    document.getElementById("louis-last-msg").innerText = text;

    const sentRow = document.createElement("div");
    sentRow.className = "classic-msg-row sent";
    sentRow.innerHTML = `<div class="classic-msg-content sent-content"><div class="classic-read-time"><span class="read-status">อ่านแล้ว</span><span class="classic-msg-time">${timeString}</span></div><div class="classic-bubble sent-bubble">${text}</div></div>`;
    container.appendChild(sentRow);
    scrollToBottom('louis-messages-container');

    let louisReply = "จัดมา อย่าให้ตี้แตกนะเว้ย 🎮🔥";
    if (text.includes("ธุระ")) {
        louisReply = "รีบเคลียร์เพื่อน รออยู่ห้องล็อบบี้เนี่ย ช้าโดนเตะนะ ⏱️";
    } else if (text.includes("ตัวเมน")) {
        louisReply = "แจ่ม! ตานี้กูซัพให้เต็มที่ มั่นใจว่าชนะแน่ 😎";
    } else if (text.includes("ขอพัก")) {
        louisReply = "เอ้า ไอ้นี่ หนีไปนอนอีกละ ขี้เกียจจริง 🥱";
    }

    setTimeout(() => {
        const replyRow = document.createElement("div");
        replyRow.className = "classic-msg-row received";
        replyRow.innerHTML = `<div class="classic-msg-avatar"><img src="images/โปรไลน์หลุย.jpg" alt="หลุยส์"></div><div class="classic-msg-content"><span class="classic-sender-name">หยุลย์</span><div class="classic-bubble-wrap"><div class="classic-bubble">${louisReply}</div><span class="classic-msg-time">${timeString}</span></div></div>`;
        container.appendChild(replyRow);
        scrollToBottom('louis-messages-container');
        document.getElementById("louis-last-msg").innerText = louisReply;
    }, 1500);
}

function scrollToBottom(containerId) {
    const scrollContainer = document.getElementById(containerId);
    if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
}