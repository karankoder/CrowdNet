import { Header } from '@/components';
import { useState, useEffect } from 'react';
import { web3FromSource, web3Accounts } from '@polkadot/extension-dapp';
import { GearApi } from '@gear-js/api';
import { Sails } from 'sails-js';
import { SailsIdlParser } from 'sails-js-parser';
import { idl } from '@/app/utils';
const Tickets = () => {
  interface Ticket {
    id: string;
    eventName: string;
    place: string;
    time: string;
    ticketCount: number;
  }

  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const initialize = async () => {
      const parser = await SailsIdlParser.new();
      const sails = new Sails(parser);

      async function State() {
        console.log('hello');
        try {
          sails.parseIdl(idl);
          const gearApi = await GearApi.create({
            providerAddress: 'wss://testnet.vara.network',
          });
          sails.setApi(gearApi);
          sails.setProgramId(import.meta.env.VITE_APP_PROGRAM_ID);
          console.log('Program ID:', import.meta.env.VITE_APP_PROGRAM_ID);
          const alice = 'kGg5hTfRcyaYX6wUdpNi7hpbYLQPGdF85q96fGn21w6pkJu4w';
          const myEvents = (await sails.services.Common.queries.GetMyEvents(
            alice
          )) as any[];

          console.log(myEvents);
          const formattedTickets = myEvents.map((event) => {
            const formattedTime = new Date(
              Number(event[2].start_time) * 1000
            ).toLocaleString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            });
            return {
              id: event[1],
              eventName: event[2].name,
              place: event[2].venue,
              time: formattedTime,
              ticketCount: event[3],
            };
          });
          setTickets(formattedTickets);
        } catch (e) {
          console.log('error:', e);
        }
      }

      State();
    };

    initialize();
  }, []);

  const handleCancel = async (ticketsNum, id) => {
    // Handle cancel ticket
    const parser = await SailsIdlParser.new();
    const sails = new Sails(parser);
    sails.parseIdl(idl);
    const gearApi = await GearApi.create({
      providerAddress: 'wss://testnet.vara.network',
    });
    sails.setApi(gearApi);
    sails.setProgramId(import.meta.env.VITE_APP_PROGRAM_ID);
    console.log('Program ID:', import.meta.env.VITE_APP_PROGRAM_ID);
    const transaction = sails.services.Events.functions.CancelAndRefund(
      ticketsNum,
      id
    );

    const allAccounts = await web3Accounts();
    const account = allAccounts[0];
    const injector = await web3FromSource(account.meta.source);
    transaction.withAccount(account.address, { signer: injector.signer });

    transaction.withGas(100_000_000_000n);
    const fee = await transaction.transactionFee();
    console.log('Transaction fee:', fee.toString());
    const { msgId, blockHash, txHash, response, isFinalized } =
      await transaction.signAndSend();

    console.log('Message ID:', msgId);
    console.log('Transaction hash:', txHash);
    console.log('Block hash:', blockHash);

    // Check if the transaction is finalized
    const finalized = await isFinalized;
    console.log('Is finalized:', finalized);

    // Get the response from the program
    try {
      const result = await response();
      console.log('Program response:', result);
    } catch (error) {
      console.error('Error executing message:', error);
    }
  };

  const handleTransfer = async (ticket_count, event_id, transfer_id) => {
    // Handle transfer ticket
    const parser = await SailsIdlParser.new();
    const sails = new Sails(parser);
    sails.parseIdl(idl);
    const gearApi = await GearApi.create({
      providerAddress: 'wss://testnet.vara.network',
    });
    sails.setApi(gearApi);
    sails.setProgramId(import.meta.env.VITE_APP_PROGRAM_ID);
    console.log('Program ID:', import.meta.env.VITE_APP_PROGRAM_ID);
    const transaction = sails.services.Events.functions.CancelAndRefund(
      ticket_count,
      event_id,
      transfer_id
    );

    const allAccounts = await web3Accounts();
    const account = allAccounts[0];
    const injector = await web3FromSource(account.meta.source);
    transaction.withAccount(account.address, { signer: injector.signer });

    transaction.withGas(100_000_000_000n);
    const fee = await transaction.transactionFee();
    console.log('Transaction fee:', fee.toString());
    const { msgId, blockHash, txHash, response, isFinalized } =
      await transaction.signAndSend();

    console.log('Message ID:', msgId);
    console.log('Transaction hash:', txHash);
    console.log('Block hash:', blockHash);

    // Check if the transaction is finalized
    const finalized = await isFinalized;
    console.log('Is finalized:', finalized);

    // Get the response from the program
    try {
      const result = await response();
      console.log('Program response:', result);
    } catch (error) {
      console.error('Error executing message:', error);
    }
  };

  const handleCheckIn = async (ticket_count, event_id) => {
    // Handle check-in ticket
    // Handle transfer ticket
    const parser = await SailsIdlParser.new();
    const sails = new Sails(parser);
    sails.parseIdl(idl);
    const gearApi = await GearApi.create({
      providerAddress: 'wss://testnet.vara.network',
    });
    sails.setApi(gearApi);
    sails.setProgramId(import.meta.env.VITE_APP_PROGRAM_ID);
    console.log('Program ID:', import.meta.env.VITE_APP_PROGRAM_ID);
    const transaction = sails.services.Events.functions.CheckIn(
      ticket_count,
      event_id
    );

    const allAccounts = await web3Accounts();
    const account = allAccounts[0];
    const injector = await web3FromSource(account.meta.source);
    transaction.withAccount(account.address, { signer: injector.signer });

    transaction.withGas(100_000_000_000n);
    const fee = await transaction.transactionFee();
    console.log('Transaction fee:', fee.toString());
    const { msgId, blockHash, txHash, response, isFinalized } =
      await transaction.signAndSend();

    console.log('Message ID:', msgId);
    console.log('Transaction hash:', txHash);
    console.log('Block hash:', blockHash);

    // Check if the transaction is finalized
    const finalized = await isFinalized;
    console.log('Is finalized:', finalized);

    // Get the response from the program
    try {
      const result = await response();
      console.log('Program response:', result);
    } catch (error) {
      console.error('Error executing message:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='w-full h-full flex flex-col items-center bg-[#0D1B2A] p-10'>
        <h1 className='text-[#00ADB5] text-[45px] font-bold mb-10'>
          My Tickets
        </h1>
        <div className='w-full flex flex-col gap-5'>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className='ticket-card flex justify-between items-center bg-[#222831] text-white p-5 rounded-lg shadow-md'
            >
              <div>
                <p className='text-[25px] font-bold'>{ticket.eventName}</p>
                <p className='text-[18px]'>{ticket.place}</p>
                <p className='text-[18px]'>{ticket.time}</p>
                <p className='text-[18px]'>
                  Total Tickets: {ticket.ticketCount}
                </p>{' '}
                {/* Display ticket count */}
              </div>
              <div className='flex gap-3'>
                <button
                  className='bg-[#FFC947] text-black font-medium text-[16px] py-2 px-4 rounded-lg shadow-md'
                  onClick={() => handleCancel(ticket.id)}
                >
                  Cancel
                </button>
                <button
                  className='bg-[#00ADB5] text-black font-medium text-[16px] py-2 px-4 rounded-lg shadow-md'
                  onClick={() => handleTransfer(ticket.id)}
                >
                  Transfer
                </button>
                <button
                  className='bg-[#6A0DAD] text-white font-medium text-[16px] py-2 px-4 rounded-lg shadow-md'
                  onClick={() => handleCheckIn(ticket.id)}
                >
                  Check-in
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { Tickets };
