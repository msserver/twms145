/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server.shops;

import client.MapleCharacter;
import client.MapleClient;
import server.shops.AbstractPlayerStore.BoughtItem;
import tools.types.Pair;

import java.util.List;

public interface IMaplePlayerShop {

    public final static byte HIRED_MERCHANT = 1;
    public final static byte PLAYER_SHOP = 2;
    public final static byte OMOK = 3;
    public final static byte MATCH_CARD = 4;

    public String getOwnerName();

    public String getDescription();

    public List<Pair<Byte, MapleCharacter>> getVisitors();

    public List<MaplePlayerShopItem> getItems();

    public boolean isOpen();

    public void setOpen(boolean open);

    public boolean removeItem(int item);

    public boolean isOwner(MapleCharacter chr);

    public byte getShopType();

    public byte getVisitorSlot(MapleCharacter visitor);

    public byte getFreeSlot();

    public int getItemId();

    public int getMeso();

    public void setMeso(int meso);

    public int getOwnerId();

    public int getOwnerAccId();

    public void addItem(MaplePlayerShopItem item);

    public void removeFromSlot(int slot);

    public void broadcastToVisitors(byte[] packet);

    public void addVisitor(MapleCharacter visitor);

    public void removeVisitor(MapleCharacter visitor);

    public void removeAllVisitors(int error, int type);

    public void buy(MapleClient c, int item, short quantity);

    public void closeShop(boolean saveItems, boolean remove);

    public String getPassword();

    public int getMaxSize();

    public int getSize();

    public int getGameType();

    public void update();

    public boolean isAvailable();

    public void setAvailable(boolean b);

    public List<BoughtItem> getBoughtItems();
}
