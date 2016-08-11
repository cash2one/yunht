#coding:utf-8  
import binascii,base64,pyDes,random 

class DES(object):  
    def __init__(self, iv, key):  
        self.iv = iv  
        self.key = key  
    def encrypt(self, data):  
        iv = binascii.unhexlify(self.iv)  
        key = binascii.unhexlify(self.key)  
        k = pyDes.triple_des(key, pyDes.CBC, iv, pad=None, padmode=pyDes.PAD_PKCS5)  
        d = k.encrypt(data)  
        d = base64.encodestring(d)  
        return d  
    def decrypt(self, data):  
        iv = binascii.unhexlify(self.iv)  
        key = binascii.unhexlify(self.key)  
        k = pyDes.triple_des(key, pyDes.CBC, iv, pad=None, padmode=pyDes.PAD_PKCS5)  
        try:  
            data = base64.decodestring(data)  
            d = k.decrypt(data)  
        except:  
            d = ''  
        return d

def encrypt(s):
    iv = str(random.randint(1132333435363738,3132333435363738))
    key = str(random.randint(113233343536373839303132333435363738393031323334,313233343536373839303132333435363738393031323334))
    iv = '1598539867510225'
    key = '269512710688838203243831550735328182008578810396'
    obj = DES(iv,key)
    encryptdata = obj.encrypt(s.encode('utf-8')).strip()
    return encryptdata,iv,key

def decrypt(s,iv,key):
    s = '0V/hDHWDQbg='
    iv = '1598539867510225'
    key = '269512710688838203243831550735328182008578810396'
    des = DES(iv,key)
    decryptdata = des.decrypt(s)
    return decryptdata.decode('utf-8')

if __name__ == '__main__':
    encryptdata,iv,key = encrypt('test')
    print encryptdata
    print decrypt(encryptdata,iv,key)
