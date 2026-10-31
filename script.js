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
    
    // แปลงชื่อแอปเป็นตัวพิมพ์เล็กทั้งหมดเพื่อให้รองรับทุกกรณี
    const app = appName.toLowerCase();

    if (app === 'locket') {
        document.getElementById("locket-app-screen").classList.remove("hidden");
    } else if (app === 'photos') {
        document.getElementById("photos-app-screen").classList.remove("hidden");
    } else if (app === 'clock') {
        document.getElementById("clock-app-screen").classList.remove("hidden");
    } else if (app === 'notes') {
        document.getElementById("notes-app-screen").classList.remove("hidden");
    } else if (app === 'calendar') {
        document.getElementById("home-screen").classList.remove("hidden");
    } else if (app === 'line') {
        document.getElementById("line-app-screen").classList.remove("hidden");
    } else if (app === 'instagram') {
        // เปิดหน้าจอ Instagram
        document.getElementById('instagram-app-screen').classList.remove('hidden');
    } else if (app === 'instagram') {
        // เปิดหน้าจอ Instagram
        document.getElementById('instagram-app-screen').classList.remove('hidden');
        // อัปเดตสถานะแท็บด้านล่างให้เริ่มที่หน้าแรก (Home)
        if (typeof updateIgNav === 'function') {
            updateIgNav('home');
        }
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

// ================= แชทที่ 1: เอมี่ =================
function openChatRoom() {
    document.getElementById("line-app-screen").classList.add("hidden");
    document.getElementById("line-chat-room-screen").classList.remove("hidden");
    document.getElementById("line-unread-badge").style.display = "none";
    document.getElementById("quick-reply-bar").classList.remove("show");
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    function formatTime(h, m) {
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    let min5 = currentMinute - 4;
    let hour5 = currentHour;
    if (min5 < 0) { min5 += 60; hour5 = (hour5 - 1 + 24) % 24; }

    let min4 = currentMinute - 3;
    let hour4 = currentHour;
    if (min4 < 0) { min4 += 60; hour4 = (hour4 - 1 + 24) % 24; }

    let min3 = currentMinute - 2;
    let hour3 = currentHour;
    if (min3 < 0) { min3 += 60; hour3 = (hour3 - 1 + 24) % 24; }

    let min2 = currentMinute - 1;
    let hour2 = currentHour;
    if (min2 < 0) { min2 += 60; hour2 = (hour2 - 1 + 24) % 24; }

    const amyTimes = [
        formatTime(hour5, min5),
        formatTime(hour4, min4),
        formatTime(hour3, min3),
        formatTime(hour2, min2),
        formatTime(currentHour, currentMinute)
    ];

    for (let i = 1; i <= 5; i++) {
        const timeEl = document.getElementById(`amy-msg-${i}`);
        if (timeEl) {
            timeEl.innerText = amyTimes[i - 1];
        }
    }

    const timeString = formatTime(currentHour, currentMinute);
    const dateEl = document.getElementById("chat-today-date");
    if (dateEl) {
        dateEl.innerText = `Today ${timeString}`;
    }

    setTimeout(() => { const el = document.getElementById("amy-extra-2"); if (el) el.style.display = "flex"; scrollToBottom('chat-messages-container'); }, 600);
    setTimeout(() => { const el = document.getElementById("amy-extra-3"); if (el) el.style.display = "flex"; scrollToBottom('chat-messages-container'); }, 1200);
    setTimeout(() => { const el = document.getElementById("amy-extra-4"); if (el) el.style.display = "flex"; scrollToBottom('chat-messages-container'); }, 1800);
    setTimeout(() => { const el = document.getElementById("amy-extra-5"); if (el) el.style.display = "flex"; scrollToBottom('chat-messages-container'); }, 2400);
}

function closeChatRoom() {
    document.getElementById("line-chat-room-screen").classList.add("hidden");
    document.getElementById("line-app-screen").classList.remove("hidden");
    document.getElementById("quick-reply-bar").classList.remove("show");
}

function toggleQuickReplies() {
    document.getElementById("quick-reply-bar").classList.toggle("show");
    scrollToBottom('chat-messages-container');
}

function sendSpecificMessage(text) {
    const container = document.getElementById("chat-messages-container");
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });

    document.getElementById("quick-reply-bar").classList.remove("show");
    document.getElementById("line-unread-badge").style.display = "none";

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
    scrollToBottom('chat-messages-container');

    let amyReplyContent = `<div class="classic-bubble">ดีมาก! ให้อภัยก็ได้ ห้ามทำอีกนะรู้ไหม 😤💕</div>`;
    let previewText = "ดีมาก! ให้อภัยก็ได้ ห้ามทำอีกนะรู้ไหม 😤💕"; 

    if (text.includes("การ์ดโปเกม่อน")) {
        amyReplyContent = `<div class="classic-bubble">เธอเอาแต่ตัวอ้วน ๆ มาให้เค้า</div>`;
        previewText = "เธอเอาแต่ตัวอ้วน ๆ มาให้เค้า";
    } else if (text.includes("ถ่ายรูปมาให้ดูหน่อย")) {
        amyReplyContent = `
            <div class="classic-photo-bubble">
                <img src="images/cl1.jpg" alt="Photo">
            </div>
        `;
        previewText = "[รูปภาพ]";
    } else if (text.includes("กำลังไป")) {
        amyReplyContent = `<div class="classic-bubble">มาทำไม เดี๋ยวเค้าไปหาเอง</div>`;
        previewText = "มาทำไม เดี๋ยวเค้าไปหาเอง";
    } else if (text.includes("รักมี่ที่สุด")) {
        amyReplyContent = `<div class="classic-bubble">ปากหวานจัง มากอดเค้าเลยยย</div>`;
        previewText = "ปากหวานจัง มากอดเค้าเลยยย";
    }

    const lastMsgEl = document.getElementById("line-last-msg");
    if (lastMsgEl) {
        lastMsgEl.innerText = previewText;
        lastMsgEl.style.color = "#8e8e93";
    }

    setTimeout(() => {
        const replyRow = document.createElement("div");
        replyRow.className = "classic-msg-row received";
        replyRow.innerHTML = `
            <div class="classic-msg-avatar"><img src="images/pl-m.jpg"></div>
            <div class="classic-msg-content">
                <span class="classic-sender-name">เอมี่</span>
                <div class="classic-bubble-wrap">
                    ${amyReplyContent}
                    <span class="classic-msg-time">${timeString}</span>
                </div>
            </div>
        `;
        container.appendChild(replyRow);
        scrollToBottom('chat-messages-container');
    }, 1200);
}

// ================= แชทกลุ่ม: อ้ายมา 4 คน =================
function openGroupChatRoom() {
    document.getElementById("line-app-screen").classList.add("hidden");
    document.getElementById("group-chat-room-screen").classList.remove("hidden");
    
    scrollToBottom('group-messages-container');
}
function closeGroupChatRoom() {
    document.getElementById("group-chat-room-screen").classList.add("hidden");
    document.getElementById("line-app-screen").classList.remove("hidden");
}

// ================= แชทที่ 3: หลุยส์ =================
function openLouisChatRoom() {
    document.getElementById("line-app-screen").classList.add("hidden");
    document.getElementById("louis-chat-room-screen").classList.remove("hidden");

    const badge = document.getElementById("louis-unread-badge");
    if (badge) {
        badge.style.display = "none";
    }
    
    setTimeout(() => { 
        const el1 = document.getElementById("louis-msg-1"); 
        if (el1) el1.style.display = "flex"; 
        scrollToBottom('louis-messages-container'); 
    }, 600);

    setTimeout(() => { 
        const el = document.getElementById("louis-msg-2"); 
        if (el) el.style.display = "flex"; 
        scrollToBottom('louis-messages-container'); 
    }, 1200);
}
function closeLouisChatRoom() {
    document.getElementById("louis-chat-room-screen").classList.add("hidden");
    document.getElementById("line-app-screen").classList.remove("hidden");
}
function toggleLouisQuickReplies() {
    document.getElementById("louis-quick-reply-bar").classList.toggle("show");
    scrollToBottom('louis-messages-container');
}
function sendLouisMessage(text) {
    const container = document.getElementById("louis-messages-container");
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    document.getElementById("louis-quick-reply-bar").classList.remove("show");
    document.getElementById("louis-unread-badge").style.display = "none";
    document.getElementById("louis-last-msg").innerText = text;

    const sentRow = document.createElement("div");
    sentRow.className = "classic-msg-row sent";
    sentRow.innerHTML = `<div class="classic-msg-content sent-content"><div class="classic-read-time"><span class="read-status">อ่านแล้ว</span><span class="classic-msg-time">${timeString}</span></div><div class="classic-bubble sent-bubble">${text}</div></div>`;
    container.appendChild(sentRow);
    scrollToBottom('louis-messages-container');

    let louisReply = "อะไร";
    if (text.includes("ถามทำไม")) louisReply = "ไม่มี";
    else if (text.includes("กวน")) louisReply = "อะไร";
    else if (text.includes("เข้าเกม")) louisReply = "แปปกำลังเข้า";

    setTimeout(() => {
        const replyRow = document.createElement("div");
        replyRow.className = "classic-msg-row received";
        replyRow.innerHTML = `<div class="classic-msg-avatar"><img src="images/pl-l.jpg" alt="หลุยส์"></div><div class="classic-msg-content"><span class="classic-sender-name">หยุลย์</span><div class="classic-bubble-wrap"><div class="classic-bubble">${louisReply}</div><span class="classic-msg-time">${timeString}</span></div></div>`;
        container.appendChild(replyRow);
        scrollToBottom('louis-messages-container');
        document.getElementById("louis-last-msg").innerText = louisReply;
    }, 1200);
}

// ================= แชทที่ 4: อูจิน =================
function openUjinChatRoom() {
    document.getElementById("line-app-screen").classList.add("hidden");
    document.getElementById("ujin-chat-room-screen").classList.remove("hidden");
    document.getElementById("ujin-unread-badge").style.display = "none";

    scrollToBottom('ujin-messages-container');

    setTimeout(() => {
        const el1 = document.getElementById("ujin-extra-1");
        if (el1) el1.style.display = "flex";
        scrollToBottom('ujin-messages-container');
    }, 600);

    setTimeout(() => {
        const el2 = document.getElementById("ujin-extra-2");
        if (el2) el2.style.display = "flex";
        scrollToBottom('ujin-messages-container');
    }, 1200);

    setTimeout(() => {
        const el3 = document.getElementById("ujin-extra-3");
        if (el3) el3.style.display = "flex";
        scrollToBottom('ujin-messages-container');
    }, 1800);
}
function closeUjinChatRoom() {
    document.getElementById("ujin-chat-room-screen").classList.add("hidden");
    document.getElementById("line-app-screen").classList.remove("hidden");
    document.getElementById("ujin-quick-reply-bar").classList.remove("show");
}
function toggleUjinQuickReplies() {
    document.getElementById("ujin-quick-reply-bar").classList.toggle("show");
    scrollToBottom('ujin-messages-container');
}
function sendUjinMessage(text) {
    const container = document.getElementById("ujin-messages-container");
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    document.getElementById("ujin-quick-reply-bar").classList.remove("show");
    document.getElementById("ujin-unread-badge").style.display = "none";
    document.getElementById("ujin-last-msg").innerText = text;

    const sentRow = document.createElement("div");
    sentRow.className = "classic-msg-row sent";
    sentRow.innerHTML = `<div class="classic-msg-content sent-content"><div class="classic-read-time"><span class="read-status">อ่านแล้ว</span><span class="classic-msg-time">${timeString}</span></div><div class="classic-bubble sent-bubble">${text}</div></div>`;
    container.appendChild(sentRow);
    scrollToBottom('ujin-messages-container');

    let ujinReply = "จะฟ้องพี่มี่";
    if (text.includes("อะไร")) ujinReply = "ไม่มีอะไร";
    else if (text.includes("อืม")) ujinReply = "อืออออ";
    else if (text.includes("นิดนึง")) ujinReply = "ใจร้าย";

    setTimeout(() => {
        const replyRow = document.createElement("div");
        replyRow.className = "classic-msg-row received";
        replyRow.innerHTML = `<div class="classic-msg-avatar"><img src="images/pl-w.jpg" alt="อูจิน"></div><div class="classic-msg-content"><span class="classic-sender-name">อูจิน</span><div class="classic-bubble-wrap"><div class="classic-bubble">${ujinReply}</div><span class="classic-msg-time">${timeString}</span></div></div>`;
        container.appendChild(replyRow);
        scrollToBottom('ujin-messages-container');
        document.getElementById("ujin-last-msg").innerText = ujinReply;
    }, 1200);
}

// ================= แชทที่ 5: แม่ =================
function openMomChatRoom() {
    document.getElementById("line-app-screen").classList.add("hidden");
    document.getElementById("mom-chat-room-screen").classList.remove("hidden");
    scrollToBottom('mom-messages-container');
}
function closeMomChatRoom() {
    document.getElementById("mom-chat-room-screen").classList.add("hidden");
    document.getElementById("line-app-screen").classList.remove("hidden");
}

function scrollToBottom(containerId) {
    const scrollContainer = document.getElementById(containerId);
    if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

// ฟังก์ชันสำหรับปิดแอปพลิเคชัน Instagram กลับมาหน้าจอหลัก
function closeInstagramApp() {
    document.getElementById('instagram-app-screen').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');
}

// ================= ระบบจัดการสตอรี่ Instagram =================
const storyData = {
    ryoul: {
        username: "ryoul_14",
        avatar: "images/โปรล้อก.jpg",
        images: ["images/ล็อกเก็ต.jpg"],
        isCF: [false]
    },
    amy: {
        username: "aipitchyy",
        avatar: "images/pl-m.jpg",
        images: ["images/ล้อก2.jpg", "images/ล้อก3.jpg", "images/ล้อก5.jpg"],
        isCF: [false, false, true] // รูปที่ 3 เป็น Close Friends
    },
    ujin: {
        username: "ujin_w",
        avatar: "images/pl-w.jpg",
        images: ["images/ล้อก6.jpg", "images/ล้อก7.jpg", "images/ล้อก8.jpg", "images/ล้อก9.jpg"],
        isCF: [false, false, false, false]
    },
    louis: {
        username: "louis_l",
        avatar: "images/pl-l.jpg",
        images: ["images/ล้อก11.jpg", "images/ล้อก12.jpg"],
        isCF: [false, false]
    }
};

let currentStoryUser = null;
let currentStoryIndex = 0;
let storyTimer = null;

function openStory(userKey) {
    currentStoryUser = userKey;
    currentStoryIndex = 0;
    
    const modal = document.getElementById("story-viewer-modal");
    modal.classList.remove("hidden");

    loadStorySlide();
}

function loadStorySlide() {
    const data = storyData[currentStoryUser];
    if (!data) return;

    // ตั้งค่าข้อมูลโปรไฟล์และรูปภาพ
    document.getElementById("story-avatar").src = data.avatar;
    document.getElementById("story-username").innerText = data.username;
    document.getElementById("story-display-img").src = data.images[currentStoryIndex];

    // จัดการป้าย Close Friends (แสดงเฉพาะเอมี่ และเฉพาะรูปที่กำหนดเป็น CF)
    const cfTopBadge = document.getElementById("story-cf-top-badge");
    const plusBadge = document.getElementById("story-avatar-plus");
    const ownerBar = document.getElementById("story-owner-bottom-bar");
    const otherBar = document.getElementById("story-other-bottom-bar");

    if (currentStoryUser === 'amy' && data.isCF && data.isCF[currentStoryIndex]) {
        cfTopBadge.classList.remove("hidden");
    } else {
        cfTopBadge.classList.add("hidden");
    }

    // ควบคุมการแสดงผลแถบด้านล่างให้ชัดเจน (แยกสตอรี่ของเรา กับ สตอรี่คนอื่น)
    if (currentStoryUser === 'ryoul') {
        plusBadge.classList.remove("hidden");
        ownerBar.classList.remove("hidden");
        ownerBar.style.display = "flex";  // บังคับแสดงผลแถบเมนู Activity
        otherBar.classList.add("hidden");
        otherBar.style.display = "none";
    } else {
        plusBadge.classList.add("hidden");
        ownerBar.classList.add("hidden");
        ownerBar.style.display = "none";
        otherBar.classList.remove("hidden");
        otherBar.style.display = "flex";  // บังคับแสดงผลช่องส่งข้อความ
    }

    // สร้างแถบ Progress Bar ด้านบน
    const container = document.getElementById("story-progress-container");
    container.innerHTML = "";
    data.images.forEach((_, idx) => {
        const barWrap = document.createElement("div");
        barWrap.style.cssText = "flex: 1; height: 2px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden; position: relative;";
        
        const fill = document.createElement("div");
        fill.id = `story-progress-${idx}`;
        fill.style.cssText = "height: 100%; width: 0%; background: #fff; transition: width 0.1s linear;";
        
        if (idx < currentStoryIndex) {
            fill.style.width = "100%";
        } else if (idx === currentStoryIndex) {
            fill.style.width = "0%";
        }
        
        barWrap.appendChild(fill);
        container.appendChild(barWrap);
    });

    // รันเวลา Progress Bar (4 วินาทีต่อรูป)
    clearTimeout(storyTimer);
    let progress = 0;
    const intervalTime = 40;
    const step = 100 / (4000 / intervalTime);

    function runProgress() {
        progress += step;
        const currentFill = document.getElementById(`story-progress-${currentStoryIndex}`);
        if (currentFill) {
            currentFill.style.width = `${progress}%`;
        }

        if (progress < 100) {
            storyTimer = setTimeout(runProgress, intervalTime);
        } else {
            if (currentStoryIndex < data.images.length - 1) {
                currentStoryIndex++;
                loadStorySlide();
            } else {
                closeStoryViewer();
            }
        }
    }
    storyTimer = setTimeout(runProgress, intervalTime);
}

function nextStoryImage(event) {
    const clickX = event.clientX;
    const screenWidth = window.innerWidth;
    const data = storyData[currentStoryUser];

    clearTimeout(storyTimer);

    if (clickX < screenWidth / 2) {
        // คลิกซ้าย (ย้อนกลับรูปก่อนหน้า)
        if (currentStoryIndex > 0) {
            currentStoryIndex--;
            loadStorySlide();
        } else {
            loadStorySlide(); // รีเซ็ตรูปเดิม
        }
    } else {
        // คลิกขวา (ไปรูปถัดไป)
        if (currentStoryIndex < data.images.length - 1) {
            currentStoryIndex++;
            loadStorySlide();
        } else {
            closeStoryViewer();
        }
    }
}

function closeStoryViewer() {
    clearTimeout(storyTimer);
    document.getElementById("story-viewer-modal").classList.add("hidden");

    // เปลี่ยนวงแหวนรอบโปรไฟล์ให้กลายเป็นสีเทา (เหมือนดูแล้ว)
    if (currentStoryUser) {
        const ring = document.getElementById(`ring-${currentStoryUser}`);
        if (ring) {
            ring.style.background = "#555"; // เปลี่ยนเป็นสีเทา
        }
    }
}

// ฟังก์ชันสำหรับสลับหน้าจอภายในโปรโตไทป์
function switchScreen(screenId) {
    // ซ่อนทุกหน้าจอที่มีคลาสสำหรับหน้าจอไอจี
    const screens = document.querySelectorAll('.instagram-screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    // แสดงเฉพาะหน้าที่ถูกเลือก
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'flex';
    }
}

// ฟังก์ชันอัปเดตสถานะความสว่าง/สีของไอคอนในแถบ Liquid Glass ด้านล่าง
function updateIgNav(activeTab) {
    const navHome = document.getElementById('nav-home');
    const navDm = document.getElementById('nav-dm');
    const navProfile = document.getElementById('nav-profile');

    // กำหนดค่าความจางสำหรับไอคอนที่ไม่ได้เลือก (0.5 คือจางลงเล็กน้อย) และ 1 คือสว่างชัด
    if (navHome) navHome.style.opacity = (activeTab === 'home') ? '1' : '0.5';
    if (navDm) navDm.style.opacity = (activeTab === 'dm') ? '1' : '0.5';
    if (navProfile) navProfile.style.opacity = (activeTab === 'profile') ? '1' : '0.5';
}

// ตั้งค่าเริ่มต้นตอนโหลดหน้าเว็บให้หน้าแรก (Home) สว่างเป็นค่าเริ่มต้น
window.addEventListener('DOMContentLoaded', () => {
    updateIgNav('home');
});

function switchScreen(screenId) {
    // 1. ซ่อนทุกหน้าจอที่มีคลาส .screen ก่อน
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });

    // 2. แสดงเฉพาะหน้าจอที่ถูกเลือก
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
}