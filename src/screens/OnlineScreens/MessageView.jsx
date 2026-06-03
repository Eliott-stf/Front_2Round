import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchConversations } from '@store/conversation/conversationSlice';
import HeaderView from '@components/UI/HeaderView';
import ConversationSidebar from '@components/Message/ConversationSidebar.jsx';
import ChatPanel from '@components/Message/ChatPanel';


export default function MessageView() {
  // On récupère les hooks
  const dispatch = useDispatch();
  const location = useLocation();
  
  // On déclare nos states locaux et store
  const [activeConversationId, setActiveConversationId] = useState(location.state?.activeConversationId || null);

  // Méthode appel API pour charger les conversations
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <main className="w-full h-screen bg-black flex flex-col overflow-hidden">
      <HeaderView 
        title="MESSAGERIE" 
        heightClass="h-[120px] shrink-0" 
      />
      
      <div className="flex-1 flex w-full max-w-[1440px] mx-auto border-t border-[#2f2f2f] overflow-hidden">
        <ConversationSidebar 
          activeId={activeConversationId} 
          setActiveId={setActiveConversationId} 
        />
        <ChatPanel 
          activeId={activeConversationId} 
        />
      </div>
    </main>
  );
}