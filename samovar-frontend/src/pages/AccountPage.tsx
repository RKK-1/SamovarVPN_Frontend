import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuthData, getEmail } from '@shared/lib/authStorage';
import { useAccountData } from '@features/account/hooks/useAccountData';
import { useDevices } from '@features/account/hooks/useDevices';
import { useHappIntegration } from '@features/account/hooks/useHappIntegration';
import { useKeyRenewal } from '@features/account/hooks/useKeyRenewal';
import type { RenewLinkResponse } from '@features/account/types';
import SubscriptionStatusCard from '@features/account/components/SubscriptionStatusCard';
import LicenseCard from '@features/account/components/LicenseCard';
import QuickActionsCard from '@features/account/components/QuickActionsCard';
import SupportCard from '@features/account/components/SupportCard';
import DevicesModal from '@features/account/components/DevicesModal';
import KeyConfirmModal from '@features/account/components/KeyConfirmModal';
import PlatformModal from '@features/account/components/PlatformModal';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [accountState, reloadAccount] = useAccountData();
  const [devicesState, loadDevices, deleteAllDevices] = useDevices();
  const [isDevicesOpen, setDevicesOpen] = useState(false);
  const [isPlatformOpen, setPlatformOpen] = useState(false);
  const { message: platformMessage, messageType: platformMessageType, clearMessage, openForPlatform } =
    useHappIntegration(accountState.licenseKey);
  const {
    state: keyState,
    open: openKeyModal,
    close: closeKeyModal,
    confirm: confirmKeyRenewal,
  } = useKeyRenewal(
    useCallback(
      (payload: RenewLinkResponse) => {
        if (payload.link || payload.license_key || payload.licensekey) {
          void reloadAccount();
        }
      },
      [reloadAccount],
    ),
  );

  const handleLogout = () => {
    clearAuthData();
    navigate('/auth');
  };

  const handleCopyKey = async () => {
    const key = accountState.licenseKey?.trim();
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
    } catch {
      // ignore clipboard errors
    }
  };

  const handleOpenDevices = async () => {
    setDevicesOpen(true);
    await loadDevices();
  };

  const handleOpenPlatform = () => {
    clearMessage();
    setPlatformOpen(true);
  };

  const handleSelectPlatform = (platform: Parameters<typeof openForPlatform>[0]) => {
    openForPlatform(platform);
  };

  const userLabel = getEmail() || accountState.subscription?.telegramId || 'Загрузка данных...';

  return (
    <main>
      <div className="container">
        <div className="header-block">
          <div>
            <h1>Личный кабинет</h1>
            <p>{userLabel}</p>
          </div>
          <div className="hero-btns">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/')}
            >
              На главную
            </button>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="main-col">
            <SubscriptionStatusCard subscription={accountState.subscription} />
            <LicenseCard
              subscription={accountState.subscription}
              licenseKey={accountState.licenseKey}
              onCopy={handleCopyKey}
              onOpenPlatformModal={handleOpenPlatform}
            />
          </div>
          <div className="side-col">
            <QuickActionsCard
              onNewKey={openKeyModal}
              onOpenRoulette={() => {}}
              onOpenDevices={handleOpenDevices}
              rouletteBlocked={Boolean(accountState.subscription?.rouletteBlocked)}
            />
            <SupportCard />
          </div>
        </div>

        {accountState.error && (
          <div className="notice error" style={{ display: 'block', marginTop: 24 }}>
            {accountState.error}
          </div>
        )}
      </div>

      <DevicesModal
        open={isDevicesOpen}
        onClose={() => setDevicesOpen(false)}
        devices={devicesState.items}
        loading={devicesState.loading}
        error={devicesState.error}
        canDelete={devicesState.canDelete}
        onRefresh={loadDevices}
        onDeleteAll={deleteAllDevices}
      />

      <KeyConfirmModal
        state={keyState}
        onClose={closeKeyModal}
        onConfirm={confirmKeyRenewal}
      />

      <PlatformModal
        open={isPlatformOpen}
        onClose={() => setPlatformOpen(false)}
        onSelect={handleSelectPlatform}
        message={platformMessage}
        messageType={platformMessageType}
      />
    </main>
  );
};

export default AccountPage;
