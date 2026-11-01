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

// ตัวอย่างฟังก์ชันเมื่อผู้ใช้กดปลดล็อกหน้าจอแรก
function showPasscodeScreen() {
    // ซ่อนหน้าจอล็อก
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) {
        lockScreen.classList.add('hidden');
    }
    
    // แสดงหน้าใส่รหัสผ่าน
    const passcodeScreen = document.getElementById('passcode-screen');
    if (passcodeScreen) {
        passcodeScreen.classList.remove('hidden');
    }
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
        // ให้เปิดหน้าฟีดหลักขึ้นมาตรงๆ เหมือนแอปอื่นๆ
        document.getElementById('instagram-app-screen').classList.remove('hidden');
        
        // (ทางเลือก) ถ้าอยากให้ทุกครั้งที่กดเปิดไอคอน IG แล้วเด้งมาหน้าฟีดเสมอ 
        // ให้ซ่อนหน้า Profile กับ DM ไว้เบื้องหลังแบบนี้ครับ
        document.getElementById('instagram-profile-screen').classList.add('hidden');
        document.getElementById('instagram-dm-screen').classList.add('hidden');
        
        if (typeof updateIgNav === 'function') {
            updateIgNav('home');
        }
    } else if (app === 'phone') {
        document.getElementById('phone-app-screen').classList.remove('hidden');
    } else if (app === 'safari') {
        document.getElementById('safari-app-screen').classList.remove('hidden');
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

// ================= แอปรูปภาพ (Photos App) =================
function openPhotoViewer(element) {
    const imgElement = element.querySelector("img");
    if (!imgElement) return;

    // กำหนดรูปภาพให้แสดงในหน้าดูรูปภาพแบบเดี่ยว (Native Photo Viewer)
    const viewerImg = document.getElementById("native-viewer-img");
    if (viewerImg) {
        viewerImg.src = imgElement.src;
    }

    // เปิดหน้าจอ Photo Viewer โดยไม่ไปยุ่งกับ Instagram
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

// ฟังก์ชันปิดแอป Instagram กลับสู่หน้า Home
function closeInstagramApp() {
    const feedScreen = document.getElementById("instagram-app-screen");
    const dmScreen = document.getElementById("instagram-dm-screen");
    const profileScreen = document.getElementById("instagram-profile-screen");
    
    if (feedScreen) feedScreen.classList.add("hidden");
    if (dmScreen) dmScreen.classList.add("hidden");
    if (profileScreen) profileScreen.classList.add("hidden");
    
    document.getElementById("home-screen").classList.remove("hidden");
}

const storyData = {
    ryoul: {
        username: "ryoul_14",
        avatar: "images/โปรล้อก.jpg",
        images: ["images/ล็อกเก็ต.jpg"],
        isCF: [false]
    },
    // เพิ่มไฮไลต์อันที่ 1 (bae bae - 3 สตอรี่)
    highlight_baebae: {
        username: "ryoul_14",
        avatar: "images/โปรล้อก.jpg",
        images: ["images/ล้อก2.jpg", "images/ล้อก3.jpg", "images/ล็อก4.jpg"],
        isCF: [false, false, false]
    },
    // เพิ่มไฮไลต์อันที่ 2 (chill - 6 สตอรี่)
    highlight_chill: {
        username: "ryoul_14",
        avatar: "images/โปรล้อก.jpg",
        images: ["images/ล้อก5.jpg", "images/ล้อก6.jpg", "images/ล้อก7.jpg", "images/ล้อก8.jpg", "images/ล้อก9.jpg", "images/โปรล้อก-รยูล.jpg"],
        isCF: [false, false, false, false, false, false]
    },
    amy: {
        username: "aipitchyy",
        avatar: "images/pl-m.jpg",
        images: ["images/ล้อก2.jpg", "images/ล้อก3.jpg", "images/ล้อก5.jpg"],
        isCF: [false, false, true]
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
    if (modal) {
        modal.classList.remove("hidden");
        modal.style.display = "flex";
    }

    loadStorySlide();
}

function loadStorySlide() {
    const data = storyData[currentStoryUser];
    if (!data) return;

    document.getElementById("story-avatar").src = data.avatar;
    document.getElementById("story-username").innerText = data.username;
    document.getElementById("story-display-img").src = data.images[currentStoryIndex];

    const cfTopBadge = document.getElementById("story-cf-top-badge");
    const plusBadge = document.getElementById("story-avatar-plus");
    const ownerBar = document.getElementById("story-owner-bottom-bar");
    const otherBar = document.getElementById("story-other-bottom-bar");

    if (currentStoryUser === 'amy' && data.isCF && data.isCF[currentStoryIndex]) {
        cfTopBadge.classList.remove("hidden");
    } else {
        cfTopBadge.classList.add("hidden");
    }

    if (currentStoryUser === 'ryoul') {
        if (plusBadge) plusBadge.classList.remove("hidden");
        if (ownerBar) { ownerBar.classList.remove("hidden"); ownerBar.style.display = "flex"; }
        if (otherBar) { otherBar.classList.add("hidden"); otherBar.style.display = "none"; }
    } else {
        if (plusBadge) plusBadge.classList.add("hidden");
        if (ownerBar) { ownerBar.classList.add("hidden"); ownerBar.style.display = "none"; }
        if (otherBar) { otherBar.classList.remove("hidden"); otherBar.style.display = "flex"; }
    }

    const container = document.getElementById("story-progress-container");
    if (container) {
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
    }

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
        if (currentStoryIndex > 0) {
            currentStoryIndex--;
            loadStorySlide();
        } else {
            loadStorySlide();
        }
    } else {
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
    const modal = document.getElementById("story-viewer-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
    }

    // เมื่อกดดูสตอรี่ของใครก็ตาม (ยกเว้นของเรา) ขอบจะเปลี่ยนเป็นสีเทาเนียนๆ ทันทีเมื่อปิด
    if (currentStoryUser && currentStoryUser !== 'ryoul') {
        const ring = document.getElementById(`ring-${currentStoryUser}`);
        if (ring) {
            ring.style.background = "transparent";
            ring.style.border = "2px solid #555";
        }
    }
}

function switchInstagramScreen(screenId) {
    // ซ่อนเฉพาะหน้าฟีด, DM และโปรไฟล์ก่อน
    document.getElementById('instagram-app-screen').classList.add('hidden');
    document.getElementById('instagram-dm-screen').classList.add('hidden');
    document.getElementById('instagram-profile-screen').classList.add('hidden');
    
    // แสดงเฉพาะหน้าจอเป้าหมายที่คุณต้องการ
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
}

// ฟังก์ชันไฮไลต์สถานะไอคอนแถบเมนูด้านล่างของ Instagram
function updateIgNav(tab) {
    const navHomes = document.querySelectorAll('#nav-home');
    const navDms = document.querySelectorAll('#nav-dm');
    const navProfiles = document.querySelectorAll('#nav-profile');
    
    navHomes.forEach(el => el.style.opacity = (tab === 'home') ? '1' : '0.5');
    navDms.forEach(el => el.style.opacity = (tab === 'dm') ? '1' : '0.5');
    navProfiles.forEach(el => el.style.opacity = (tab === 'profile') ? '1' : '0.5');
}

function goHome() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });
    const homeScreen = document.getElementById("home-screen");
    if (homeScreen) {
        homeScreen.classList.remove('hidden');
    }
}

// ฐานข้อมูลแคปชัน วันที่ และคอมเมนต์ของแต่ละรูป (แก้ไขข้อความตามต้องการได้เลยครับ)
const postDetails = {
    "images/ล็อกเก็ต.jpg": {
        likes: "1,428 likes",
        caption: "วันหยุดสุดชิล เดินทางไปคาเฟ่โปรด ✌️✨",
        date: "พึ่งลงเมื่อวาน",
        comments: [
            { user: "aipitchyy", text: "สวยมากก 😍" },
            { user: "ujin_00", text: "ขอไปด้วยคนดิ" }
        ]
    },
    "images/โฟ1-1.jpg": {
        likes: "954 likes",
        caption: "ท้องฟ้าวันนี้สวยเป็นพิเศษ ☁️ บรรยากาศดีมาก",
        date: "3 วันที่แล้ว",
        comments: []
    },
    "images/โฟ2.jpg": {
        likes: "1,120 likes",
        caption: "Memories in 2026 📸 เก็บตกภาพเก่า",
        date: "January 15, 2026",
        comments: [
            { user: "louis_xyz", text: "คิดถึงบรรยากาศนี้เลย" }
        ]
    },
    "images/โฟ3.jpg": {
        likes: "830 likes",
        caption: "Working hard or hardly working 💻 ปั่นงานยาวไป",
        date: "November 20, 2025",
        comments: []
    },
    "images/โฟ4.jpg": {
        likes: "670 likes",
        caption: "Good food, good mood 🍣 มื้อนี้อิ่มคุ้ม",
        date: "August 12, 2025",
        comments: [
            { user: "aipitchyy", text: "กินอีกแล้วนะ 😂" }
        ]
    },
    "images/โฟ5.jpg": {
        likes: "1,502 likes",
        caption: "Throwback 2024 ✨ ช่วงเวลาดีๆ",
        date: "December 31, 2024",
        comments: []
    },
    "images/โฟ6.jpg": {
        likes: "740 likes",
        caption: "Routine day ☕️",
        date: "October 5, 2024",
        comments: []
    },
    "images/โฟ7.jpg": {
        likes: "910 likes",
        caption: "Sunset vibe 🌅",
        date: "September 14, 2024",
        comments: []
    },
    "images/โฟ8.jpg": {
        likes: "1,230 likes",
        caption: "Happy time with my favorite person 🤍",
        date: "July 22, 2024",
        comments: [
            { user: "aipitchyy", text: "น่ารักที่สุด 😊" }
        ]
    }
};

// ฟังก์ชันเมื่อกดที่รูปในโปรไฟล์ จะรวบรวมรูปทั้งหมดมาแสดงเป็นฟีดให้เลื่อนดูได้ต่อเนื่อง
function openPhotoViewer(element) {
    const clickedImg = element.querySelector("img");
    const targetSrc = clickedImg ? clickedImg.getAttribute("src") : "";

    // ดึงรูปภาพทั้งหมดในตารางโปรไฟล์มาสร้างเป็นฟีด
    const allProfileImages = document.querySelectorAll("#instagram-profile-screen .photos-grid img, #instagram-profile-screen div[style*='aspect-ratio'] img");
    
    const container = document.getElementById("photo-feed-container");
    container.innerHTML = ""; // ล้างข้อมูลเก่า

    let targetElement = null;

    // สร้างโครงสร้างโพสต์ไอจีทีละรูป
    allProfileImages.forEach(img => {
        const src = img.getAttribute("src");
        const details = postDetails[src] || {
            likes: "842 likes",
            caption: "Moments ✨ กำลังใจสำคัญ",
            date: "October 10, 2025",
            comments: [{ user: "aipitchyy", text: "เท่จังเลยย" }]
        };

        // สร้างบล็อกโพสต์ไอจี
        const postDiv = document.createElement("div");
        postDiv.style.cssText = "background: #000; border-bottom: 1px solid #262626; padding-bottom: 16px; margin-bottom: 12px;";
        
        let commentsHtml = "";
        if (details.comments && details.comments.length > 0) {
            details.comments.forEach(c => {
                commentsHtml += `<div style="font-size: 13px; margin-top: 4px;"><span style="font-weight: 600; margin-right: 6px;">${c.user}</span>${c.text}</div>`;
            });
        }

        postDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="images/โปรล้อก.jpg" alt="Avatar" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                    <span style="font-size: 13px; font-weight: 600; color: #fff;">ryoul_14</span>
                </div>
                <div style="color: #fff; font-size: 18px; font-weight: bold; letter-spacing: 1px;">···</div>
            </div>
            <div style="width: 100%; background: #000; display: flex; align-items: center; justify-content: center;">
                <img src="${src}" alt="Post Image" style="width: 100%; max-height: 450px; object-fit: cover; display: block;" data-src="${src}">
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 12px;">
                <div style="display: flex; gap: 16px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div style="padding: 0 12px; color: #fff;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">${details.likes}</div>
                <div style="font-size: 13px; margin-bottom: 6px;">
                    <span style="font-weight: 600; margin-right: 6px;">ryoul_14</span>
                    <span>${details.caption}</span>
                </div>
                ${commentsHtml}
                <div style="font-size: 10px; color: #8e8e93; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${details.date}</div>
            </div>
        `;

        container.appendChild(postDiv);

        if (src === targetSrc) {
            targetElement = postDiv;
        }
    });

    // เปิดหน้าจอ Photo Viewer
    document.getElementById("photo-viewer-screen").classList.remove("hidden");

    // เลื่อนหน้าจอไปที่รูปที่เรากดเลือกไว้ทันที
    if (targetElement) {
        setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 50);
    }
}

function closePhotoViewer() {
    document.getElementById("photo-viewer-screen").classList.add("hidden");
}

function closePhoneApp() {
    document.getElementById('phone-app-screen').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');
}

function closeSafariApp() {
    document.getElementById("safari-app-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
}

// แก้ไขให้ฟังก์ชันนี้เรียกหน้าใส่รหัสผ่าน
function unlockPhone() {
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) {
        lockScreen.classList.add('hidden');
    }
    
    const passcodeScreen = document.getElementById('passcode-screen');
    if (passcodeScreen) {
        passcodeScreen.classList.remove('hidden');
    }
}

// ================= ฟังก์ชันสำหรับโพสต์ Instagram (แยกจากแอปรูปภาพ) =================
function openInstagramPhoto(element) {
    const imgElement = element.querySelector("img") || element;
    if (!imgElement) return;

    // ถ้าคุณมีหน้าจอสำหรับดูโพสต์ไอจีโดยเฉพาะ ให้กำหนดค่าตรงนี้
    const igViewerImg = document.getElementById("instagram-viewer-img"); 
    if (igViewerImg) {
        igViewerImg.src = imgElement.src;
        document.getElementById("instagram-viewer-screen").classList.remove("hidden");
    }
}

function closeInstagramPhoto() {
    const igScreen = document.getElementById("instagram-viewer-screen");
    if (igScreen) {
        igScreen.classList.add("hidden");
    }
}